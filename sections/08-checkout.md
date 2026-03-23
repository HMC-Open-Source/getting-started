The `checkout` command historically does three pretty different things — navigating branches, restoring files, and time-traveling to old commits. With git version 2.23, they introduced `switch` and `restore` to make this clearer. You can still use `checkout` for everything if you want — most older documentation and even AI chatbots still use it.

The table below shows both options side by side. This lesson uses the newer `switch` commands, but you'll recognize either in the wild.

| Action | CHECKOUT (still works) | NEW COMMAND |
|---|---|---|
| Create & switch to new branch | `git checkout -b branch_name` | `git switch -c branch_name` |
| Navigate to existing branch | `git checkout branch_name` | `git switch branch_name` |
| Restore a file to last commit | `git checkout -- filename` | `git restore filename` |
| Visit an old commit (detached HEAD) | `git checkout a3f8c21` | `git switch --detach a3f8c21` |

[CALLOUT type="tip"]
The `--` in `git checkout -- filename` is a separator that tells git "what follows is a filename, not a branch name." `git restore` sidesteps this ambiguity entirely since it only ever operates on files.
[/CALLOUT]
