A workflow will have different practices and norms depending on who is contributing and the policies of the team. In general, the concepts are all similar. Here are the core ideas you should practice regardless of context.

**main** — This is your "stable" branch — the source of truth. It should always be protected in a public repository so that contributors can't make direct pushes to main.

**branch** — It's industry practice to always create a branch from main when making edits or contributing new features. This keeps main stable until your contributions are tested, reviewed, and approved.

**pull request (PR)** — A pull request is not to be confused with the command `git pull`. Submitting one means you're asking the maintainers: "Hey, I made some edits — please pull my changes into the project!" A PR is your contribution submission.

**merge** — Merging is when a branch gets integrated into main. Your changes become part of the main project. After merging, the admin cleans up the branch on GitHub, and you update your local main and delete your local branch.

Branches are extremely powerful. When you switch branches, git literally changes the files in your project folder to match that branch's state. Your actual code changes. This means two different versions of the same project can exist in the same folder — just swap which branch you're on.
