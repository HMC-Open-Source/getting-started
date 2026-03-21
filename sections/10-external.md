The external contributor workflow is for when you don't have direct write access to a repository — for example, contributing to someone else's open source project. The main differences are **forking** and setting **remotes**.

**1. Fork the repo on GitHub.** This creates your own copy under your account. You have write access to your fork, but not the original.

**2. Clone your fork using the SSH URL.**

```bash
git clone git@github.com:your-username/repo-name.git
```

**3. Add the original repo as "upstream".** This creates a named pointer so you can stay in sync with the original. (`origin` points to your fork; `upstream` points to the original.)

```bash
git remote add upstream git@github.com:original-owner/repo-name.git
```

`upstream` is the conventional name, but you could technically call it anything — it's just a named pointer to a URL.

**4. Create and switch to a new branch.**

```bash
git switch -c your-branch-name
```

**5. Make your edits, commit, and check for conflicts with the original.**

```bash
git add .
git commit -m "your commit message"
git pull upstream main
```

**6. Push your branch to your fork.**

```bash
git push -u origin your-branch-name
```

**7. Open a pull request on GitHub** from your fork to the original repo.

**8. Once approved and merged, sync your fork and clean up.**

```bash
git switch main
git pull upstream main
git branch -d your-branch-name
```
