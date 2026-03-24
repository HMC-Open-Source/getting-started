Use `git log --oneline` to see your commit history at a glance. Each line is one commit which
contains a short hash on the left and the commit message on the right. The most recent commit is 
at the top.

```bash
a3f8c21 fix broken nav link on mobile
9d2e441 add student contribution guide to README
f7b3c09 update homepage text
2a1d887 initial commit
```

The **hash** is git's unique ID for each commit, or snapshot. 

The **commit message** is your note about what changed. 

Good messages make your history readable. For example, `fixed broken nav link` tells you something 
useful, while `fixed bug` doesn't really tell you anything.

Use `git reflog` for a more comprehensive history, which you can read more about by 
[clicking here](https://git-scm.com/docs/git-reflog).

### Three ways to access old commits

| Command | What it does |
| --- | --- |
| `git checkout f7b3c09` | I just want to look at an old commit, which puts you in a detached HEAD state. |
| `git revert f7b3c09` | I want to undo a commit but keep the history. This creates a *new* commit that applies the opposite changes. Recommended for shared repos. |
| `git reset --hard f7b3c09` | I want to rollback the branch in time. This deletes commits by moving the branch pointer backward. |


[QUIZ id="quiz-2a"]
Q: What command works to show you the history of your commits?  
- git checkout 
* git log --oneline
- git commits
- git hash
[/QUIZ]
