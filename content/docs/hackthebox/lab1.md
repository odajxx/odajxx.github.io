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

Making a Change.

## Further reading

Read [about how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework
PING

┌─odaj@parrot
└──╼ $ping -c4 10.129.1.15
PING 10.129.1.15 (10.129.1.15) 56(84) bytes of data.
64 bytes from 10.129.1.15: icmp_seq=1 ttl=63 time=132 ms
64 bytes from 10.129.1.15: icmp_seq=2 ttl=63 time=157 ms
64 bytes from 10.129.1.15: icmp_seq=3 ttl=63 time=181 ms
64 bytes from 10.129.1.15: icmp_seq=4 ttl=63 time=265 ms


NMAP

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
