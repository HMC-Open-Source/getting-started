Git solves the "project_final_ACTUALLY_FINAL" problem by creating a built-in history of changes. Instead of copying folders, every deliberate save is a **commit**, or a snapshot you can always return to.

A repository (repo) is simply a project folder that git is tracking. When you run `git init` or clone a repo, git starts watching that folder and recording its history.

**COMMITS** are deliberate snapshots of your project, like save points in a video game. But git doesn't save a full copy of every file at every snapshot. Instead, it records the diff, which is the difference between the last snapshot and the current one.

Git keeps a history of changes through your commits:

- You can always go back to any snapshot
- You can see exactly what changed between snapshots and who changed it
- You can experiment freely knowing nothing is permanently lost

[QUIZ id="quiz-1a" hint="Commits are the bread and butter of git"]
Q: What are commits? 
- Commits are like snapshots
- Commits records the diffs
- Commits are what make version control possible
* All of the above!
[/QUIZ]
