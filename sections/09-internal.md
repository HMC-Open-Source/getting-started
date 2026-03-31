The internal contributor workflow is for when you have direct write access to the repository — you've been added as a collaborator by the repo owner.

[CALLOUT type="note"]
Solo projects follow this same workflow! The only difference is that you can skip the pull request and merge directly into main. We still recommend doing PRs while you're learning — it's great practice.
[/CALLOUT]

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

[CALLOUT type="warning"]
Always run `git pull origin main` *after* committing your changes and *before* pushing. This catches any updates that happened while you were working and surfaces conflicts on your branch — not in the PR.
[/CALLOUT]

[ACCORDION title="🔍 What if I don't have write access and try to push anyway?"]
GitHub will reject it immediately with a permission error:

```
ERROR: Permission to original-owner/repo-name.git denied to your-username.
fatal: Could not read from remote repository.
```

You'd never reach the PR stage — git can't push the branch up in the first place. This is exactly the problem that **forking** solves (see the External Contributor section).
[/ACCORDION]

[ACCORDION title="Common Problems"]
(1) Trying to run "git pull origin main" in your local copy of a repo leads to this error message:

```
fatal: Need to specify how to reconcile divergent branches.
```

There may be commits in the GitHub repo that differ from commits in your local repo. You can specify that you want these versions to be merged by running "git config pull.rebase false."

(2) Trying to run "git pull origin main" in your local copy of a repo leads to this error message:

```
fatal: refusing to merge unrelated histories
```

This means that the GitHub repo and your local repo have no shared history. It might happen if you used "git init" to create your local repo and are trying to merge with a GitHub repo that already had commits, or the remote (GitHub) repo was initialized with a README (GitHub creates an initial commit that your local repo does not have). 

One solution is running "git pull origin main --allow-unrelated-histories". After, you will see a series of prompts. First, there will likely be a folder of duplicated files (from the GitHub repo) in your workspace. Decide which copies of the files you want to keep, and delete the rest. Then you can stage your changes with the normal commands: "git add .", "git commit -m ". Next, you may be prompted to enter a commit message explaining why the merge is necessary. You can type a message, or just press enter (or whatever keyboard shortcut it says for Exit) to use the default message. If asked whether you want to "Save modified buffer?" you can also just press enter/Y. This is just confirming that you want to save your changes. For the "File Name to Write" prompt, press enter again to use the default.

Now you can run "git status" and "ls" to check that everything is up to date and the files that you expect are in your workspace.

[/ACCORDION]

[PRACTICE title="🛠 Real World Practice"]
Find one of your own projects and try uploading it to your GitHub account using the workflow above.

**If it's class-related, set the repo to private** to abide by your classroom's academic integrity policies.
- Created a new repo on GitHub
- Cloned the repo locally
- Created a branch
- Added files, committed, and pushed
- Opened a pull request on GitHub
- Merged and cleaned up the branch
[/PRACTICE]

[QUIZ id="quiz-3" hint="Think about the order of operations — you need to commit before you can pull, because git needs your work saved before it can attempt a merge."]
Q: What is the correct order of steps before opening a pull request?
- git pull → git add → git commit → git push
* git add → git commit → git pull origin main → git push
- git add → git push → git commit → git pull
- git commit → git add → git pull → git push
[/QUIZ]
