The external contributor workflow is for when you don't have direct write access to a repository — for example, contributing to someone else's open source project. The main differences from the internal workflow are **forking** and setting **remotes**.

**1. Fork the repo on GitHub.** This creates your own copy under your account. You have write access to your fork, but not the original.

**2. Clone your fork using the SSH URL.**

```bash
git clone git@github.com:your-username/repo-name.git
```

**3. Add the original repo as "upstream".** This creates a named pointer so you can stay in sync with the original. `origin` points to your fork; `upstream` points to the original.

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

[ACCORDION title="🔍 Why fork instead of just cloning?"]
When you clone a repo you don't own, you can pull it down and make local commits — but you can't push back to it. GitHub will reject the push with a permission error. Forking creates a copy of the repo *on GitHub under your account*, where you do have write access. You push to your fork, then open a PR from your fork to the original.

Think of it like: `original repo → your GitHub fork → your machine`. The fork is the middleman that gives you a place to push.
[/ACCORDION]

[PRACTICE title="🛠 Real World Practice"]
The **HMC Open Source Get Started repo** has a food spots activity where you can practice the full external contributor workflow.

You'll add a new `.md` file to the food spots folder — one file per contribution.

*The Get Started repo link will be added here once it's live.*
- Forked the Get Started repo
- Cloned my fork locally
- Added upstream remote
- Created a branch and added my food spot file
- Pushed to my fork and opened a PR
[/PRACTICE]
