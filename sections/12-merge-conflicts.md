Merge conflicts happen when two branches have both made changes to the **same part of the same file** and git doesn't know which version to keep. Git can typically merge changes automatically when two edits don't overlap — but in some cases it needs a human to decide.

**Don't panic — merge conflicts are normal. Every developer runs into them.**

**When do they appear?**

- When you run `git pull origin main` to sync your branch with the latest main — if someone else edited the same lines you did, git flags it immediately
- When a PR is being merged on GitHub — GitHub will show a warning saying "This branch has conflicts that must be resolved" instead of the green merge button

**What does it look like?**

Git marks the conflict directly inside the affected file:

```
<<<<<<< HEAD
This is your version of the line
=======
This is the incoming version of the line
>>>>>>> main
```

Everything between `<<<<<<<` and `=======` is your version. Everything between `=======` and `>>>>>>>` is the incoming version.

**How do I resolve it?**

- Open the conflicting file
- Decide what the final version should look like — keep yours, keep theirs, or combine both
- Delete all the conflict marker lines (`<<<<<<<`, `=======`, `>>>>>>>`)
- Save, stage, and commit the resolution

```bash
git add .
git commit -m "resolve merge conflict"
```

**The best prevention:** pull from main frequently while you're working on your branch. The longer a branch goes without syncing, the more likely a conflict becomes.

For a deeper dive, check out Atlassian's merge conflict guide at atlassian.com/git/tutorials/using-branches/merge-conflicts or GitHub's documentation at docs.github.com.
