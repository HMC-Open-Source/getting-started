Use this when you're starting a brand new project and want git to start tracking it. You can also do this entirely through the GitHub interface if you prefer.

**1. Create a new repo on GitHub.** Give it a name. You can add a README if you want.

**2. Navigate to your project folder in the terminal.**

```bash
cd your-project-folder-path
```

**3. Clone the repo.** This connects your local folder to the GitHub repo in one step.

```bash
git clone git@github.com:username/repo-name.git
```

There is another way to do this with `git init` and `git remote add`, but why do two commands when one command do trick?

**4. Stage your files.** This is like putting files on a workbench and saying they're ready to be committed. The `.` means all files in the current folder.

```bash
git add .
```

**5. Commit your files.** The `-m` flag lets you write the message inline. Make it descriptive enough to be useful, but keep it concise.

```bash
git commit -m "initial commit"
```

**6. Push to GitHub!** The `-u` flag creates the tracking relationship between your local branch and the remote, so future pushes just need `git push`.

```bash
git push -u origin main
```

Now your GitHub repo is synced with your local files.

[CALLOUT type="note"]
These steps are for starting a brand new project. If you're joining an existing repo, skip ahead to the Internal Contributor Workflow.
[/CALLOUT]

[QUIZ id="quiz-2" hint="Think about what the -u flag does and when you only need it."]
Q: You've just created a new branch called fix-header and made your first commit. What command pushes this branch to GitHub for the first time?
- git push
- git push origin main
* git push -u origin fix-header
- git push --set-upstream fix-header origin
[/QUIZ]
