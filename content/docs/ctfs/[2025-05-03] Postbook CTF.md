---
title: "[2025-05-03] Postbook CTF"
description: ""
summary: ""
date: 2025-02-23T22:52:27+01:00
lastmod: 2025-02-23T22:52:27+01:00
draft: false
weight: 999
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Introduction
---

The Postbook CTF on HackerOne's Hacker101 platform is an excellent beginner-focused Capture the Flag challenge designed to highlight critical web vulnerabilities. In this write-up, I will walk through each of the seven flags I uncovered, explaining the nature of each security flaw, its real-world implication, and how it can be mitigated.

### Flag 1: Credential Guessing (Default Password)

- **Attack:** Logged in using the username user and the default password password.

- **Implication:** Systems using default or guessable credentials are highly vulnerable to brute-force or credential-stuffing attacks.

- **Prevention:**
  - Enforce strong password policies.
  - Disable or alert on default accounts.
  - Use rate limiting and CAPTCHA on login endpoints.

📸 [Insert screenshot showing login success with default creds]

### Flag 2: Insecure Direct Object Reference (IDOR)

- **Attack:** Manually changed the user ID in the URL (e.g., ?id=2) to access another user's profile.

- **Implication:** IDOR allows attackers to access or modify unauthorized resources, leading to data leakage or manipulation.

- **Prevention:**
  - Enforce authorization checks server-side.
  - Avoid exposing internal object identifiers.
  - Use access control lists (ACLs) and robust session validation.

📸 [Insert screenshot showing access to another user’s page]

### Flag 3: Hidden Field Manipulation

- **Attack:** Used developer tools to change a hidden form field's user_id value from 2 to 1, posting content as another user.
- **Implication:** Clients can tamper with hidden fields and impersonate users or perform unauthorized actions.

- **Prevention:**
  - Never trust client-side data; validate all fields server-side.
  - Use session-based identifiers instead of hidden fields for user actions.

📸 [Insert screenshot of developer tools showing form manipulation]

### Flag 4: Mathematical Obfuscation and Predictable ID Access

- **Attack:** Multiplied 189 * 5 to get 945, then accessed a URL with ?id=945 to find a hidden post.

- **Implication:** Predictable ID schemes allow for enumeration and discovery of hidden or sensitive content.

- **Prevention:**
  - Use UUIDs or non-sequential identifiers.
  - Require authentication and authorization for accessing resources.

📸 [Insert screenshot showing post at calculated ID]

### Flag 5: Unauthorized Post Editing

- **Attack:** Altered post IDs in the edit URL to modify another user's post.
- **Implication:** Lack of proper authorization checks allows data tampering.

- **Prevention:**
  - Implement strict ownership checks before allowing edit/delete operations.
  - - Log and monitor changes to critical resources.

📸 [Insert before-and-after screenshots showing edited content]

### Flag 6: Cookie Tampering and Session Hijacking

- **Attack:** Found an MD5 hash in the cookies and replaced it with the hash for user ID 1 (i.e., c4ca4238a0b923820dcc509a6f75849b for admin).

- **Implication:** Weak or predictable session tokens can be manipulated to impersonate other users.

- **Prevention:**
  - Use cryptographically secure, random session tokens.
  - Sign and encrypt cookies to prevent tampering.
  - Avoid using MD5 for hashing sensitive data.

📸 [Insert screenshot showing admin session after cookie change]

### Flag 7: Unauthorized Post Deletion

- **Attack:** Deleted posts by sending requests with manipulated or predictable post IDs.

- **Implication:** Without authorization checks, users can delete others' content.

- **Prevention:**
  - Verify the requesting user has permission to perform the action.
  - Use token-based authorization (e.g., CSRF tokens) for destructive operations.

📸 [Insert screenshot confirming successful deletion of unauthorized post]

### Key Takeaways

The Postbook CTF effectively demonstrates how small oversights in web applications can lead to severe vulnerabilities. As developers and security professionals, it's critical to:

- Never trust user input—always validate server-side.
- Secure authentication and authorization mechanisms.
- Use robust, non-predictable identifiers.
- Protect client-server communication from tampering.

By understanding these common flaws and how to prevent them, we can build and maintain more secure web applications.
