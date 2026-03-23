[CALLOUT type="note"]
This lesson covers enough to contribute to real projects. But git is deep — there's always more to learn, and that's completely normal. Here's an honest map of what exists beyond this guide.
[/CALLOUT]

### Commands not covered here

- `git stash` — temporarily shelve work in progress so you can switch context without committing unfinished work
- `git rebase` — an alternative to merging that rewrites history for a cleaner commit timeline; very common but opinionated
- `git cherry-pick` — apply a specific commit from one branch onto another
- `git bisect` — a debugging tool that helps you find which commit introduced a bug
- `.gitignore` — a file that tells git to ignore certain files or folders (you'll hit this almost immediately)
- `git diff` — view exactly what changed between commits or in your working directory
- `git remote -v` — check which remotes your repo is connected to

### Concepts not covered

- Squashing commits before merging — combining multiple small commits into one clean commit
- Protected branch rules beyond just main
- Git hooks — scripts that run automatically at certain points in the git workflow
- Rebasing vs. merging — a whole conversation in the git community
- Signed commits

### Tools that build on top of git

- GitHub CLI (`gh`) — doing GitHub things from the terminal without the browser
- Git GUIs like GitKraken or GitHub Desktop — visual interfaces for those who prefer not to use the terminal
- Oh My Zsh git plugin — terminal shortcuts for common git commands once you're comfortable

### Further reading

[RESOURCES]
title: Learn Git Branching
desc: A browser-based interactive sandbox for learning branching and merging visually. No downloads required.
url: https://learngitbranching.js.org
link: learngitbranching.js.org
---
title: Pro Git (free book)
desc: The de facto standard book on git — covers basics through internals. Free online under Creative Commons.
url: https://git-scm.com/book
link: git-scm.com/book
---
title: Oh My Git!
desc: A gamified way to learn git. Card-based for beginners, can also be played using the command line.
url: https://ohmygit.org
link: ohmygit.org
---
title: Atlassian Git Tutorials
desc: Comprehensive written guides covering every major git concept, with good diagrams and examples.
url: https://www.atlassian.com/git/tutorials
link: atlassian.com/git/tutorials
---
title: How Git Works (zine)
desc: Julia Evans' illustrated zine for intermediate users. Great next step once you're comfortable with the basics here.
url: https://wizardzines.com/zines/git/
link: wizardzines.com
[/RESOURCES]

[CALLOUT type="success"]
You made it through the whole lesson! You now know enough git to contribute to real projects, collaborate with teammates, and navigate open source workflows. The rest is practice — so go make some commits.
[/CALLOUT]
