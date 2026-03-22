The internal contributor workflow is for when you have direct write access to the repository — you've been added as a collaborator by the repo owner.

**A note on solo projects:** solo projects follow this same workflow! The only difference is that you can skip the pull request and merge directly into main. We still recommend doing PRs while you're learning — it's great practice for seeing your diff on GitHub and getting comfortable with the process.

**1. Clone the repo (or pull if already cloned).**

```bash
git clone git@github.com:username/repo-name.git
```

Or if you've already cloned it:

```bash
git pull origin main
```

**2. Create and switch to a new branch.**

```bash
git switch -c your-branch-name
```

**3. Make your edits, stage, commit, and check for conflicts.**

```bash
git add .
git commit -m "your commit message"
git pull origin main
```

Pulling main *after* committing is important — it catches any changes that happened while you were working. Resolve any conflicts here before pushing.

**4. Push your branch to GitHub.**

```bash
git push -u origin your-branch-name
```

**5. Open a pull request on GitHub.** You'll see a highlighted "Compare & pull request" button appear. Write a clear description of what changed and why.

**6. Once approved and merged, update your local main and clean up.**

```bash
git switch main
git pull origin main
git branch -d your-branch-name
```

[QUIZ id="quiz-3" hint="Think about the order of operations — you need to commit before you can pull, because git needs your work saved before it can attempt a merge."]
Q: What is the correct order of steps before opening a pull request?
- git pull → git add → git commit → git push
* git add → git commit → git pull origin main → git push
- git add → git push → git commit → git pull
- git commit → git add → git pull → git push
[/QUIZ]
