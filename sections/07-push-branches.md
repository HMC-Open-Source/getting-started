### About git push

Think of `git push` as sending your commits up to the repository on GitHub. The first push of any branch should always use the `-u` flag:

```bash
git push -u origin branch-name
```

This creates the tracking relationship — git remembers where that branch lives on the remote. After that first push, you can just use `git push` for as long as you're working on that branch. Every new branch needs this once.

### About branches

Branches are extremely powerful. You can literally switch between `main` and a branch you've created, and the code in your folder will reflect the differences.

As a best practice, use branching for new features and edits — even small ones. When you're done, merge back into main.

On solo projects, you *could* keep pushing directly to main and skip branching entirely. But if you practice creating branches, you'll be a lot more familiar with open source and industry standards when the time comes.
