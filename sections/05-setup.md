Follow these steps once per machine to get git connected to GitHub.


**1. Create a GitHub account** at [github.com](https://github.com) if you haven't already.

**2. Open a terminal and install git.** Installation varies by OS. Visit 
[git-scm.com](https://git-scm.com) for further instructions.

[CALLOUT type="tip"]
Windows users: It's recommedned to use WSL. Powershell instructions may vary, so you may
have to troubleshoot some more.
[/CALLOUT]

**3. Set your identity.** Replace "Your Name" with your name and use the same email as your 
GitHub account 

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

**4. Generate an SSH key.** SSH lets your machine talk to GitHub securely without entering 
a password every time.

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

When prompted, hit Enter to accept the default location. You can set a passphrase or hit 
Enter to skip.

**5. Copy your public key.**

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the entire output, from `ssh-ed25519` all the way to your email address.

**6. Add the key to GitHub.** Go to GitHub → Settings → SSH and GPG keys → New SSH Key. 
Paste your key and save.

**7. Test the connection.**

```bash
ssh -T git@github.com
```

You should see: *Hi username! You've successfully authenticated, but GitHub does not 
provide shell access.* That message is normal and it means it worked.

[CALLOUT type="tip"]
SSH is preferred over HTTPS because once it's set up, you never need to enter credentials 
again. When cloning, always choose the **SSH** tab on GitHub's Code button, not HTTPS.
[/CALLOUT]

[QUIZ id="quiz-5a" hint="Think about which method avoids managing passwords or tokens."]
Q: Why do we use SSH to authenticate with GitHub instead of HTTPS?
- HTTPS doesn't work on Mac or Linux
- SSH is faster for large file transfers
* SSH uses a key pair for authentication. Once set up, no passwords or tokens needed
- HTTPS only works for public repos
[/QUIZ]
