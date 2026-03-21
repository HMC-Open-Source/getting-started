Use `git log --oneline` to see your commit history at a glance. Each line is one commit — a short hash on the left and the commit message on the right. Most recent commit is at the top.

```bash
a3f8c21 fix broken nav link on mobile
9d2e441 add student contribution guide to README
f7b3c09 update homepage text
2a1d887 initial commit
```

The **hash** is git's unique ID for each snapshot. The **commit message** is your note about what changed. Good messages make your history readable — `fixed broken nav link` tells you something useful, `stuff` tells you nothing.

Use `git reflog` for a more comprehensive history that includes every time your HEAD pointer moved — even resets and checkouts. Think of `git log` as your project's public history and `git reflog` as git's private diary.

**Three ways to access old commits:**

- `git checkout <hash>` — just want to look? This puts you in "detached HEAD" state — you're visiting that snapshot but nothing changes permanently. Get back with `git checkout main`.
- `git revert <hash>` — want to undo a commit but keep the history? This creates a *new* commit that applies the opposite changes. Recommended for shared repos.
- `git reset --hard <hash>` — want to roll the branch back in time? This moves the branch pointer backward. The commits after it are gone from the history. Use with caution on shared repos.

The key difference: `git revert` moves **forward** by adding a new commit. `git reset` moves **backward** by rewriting history.
