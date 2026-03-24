A workflow will have different practices and norms depending on who is contributing and the 
policies of the team. In general, here are the broad concepts you should know about in a 
workflow when using git with GitHub.





| Concept | What happens |
| --- | --- |
| **main**  | The "main" branch is the "stable" branch of the project. This is always protected from major changes and edits until code is vetted and tested by users. You typically clone and pull from main to make sure your local copy of the project is up to date. |
| **branch**  | It's best practice to always create a branch from main when making edits or contributing new features. This helps keep main untouched. At this stage, you will typically make edits, stage them with the `add` command, and make commits. During the editing process, you should also `pull` from main often, as **merge conflicts** may occur at this stage. |
| **pull request or PR** | A pull request is not to be confused with the command `git pull`, which you'll practice with later. Submitting a PR means you're asking the maintainers: "Hey, I made some edits, please pull my changes into the project!" In other words, a PR is your contribution. This may also be a stage where you run into **merge conflicts** depending on whether main was updated prior to your PR, or someone else is submitting a PR that changes the same lines of code as you. You'll typically want to resolve conflicts even before you submit a PR |
| **merge** | Merging is when a branch gets integrated into main. After merging, the admin cleans up the branch on GitHub, and you update your local main and delete your local branch. |


Branching is an extremely powerful tool. When you switch branches, git literally changes the 
files in your project folder to match that branch's state. Your actual code changes. This means 
two different versions of the same project can exist in the same folder. All you have to do is 
switch branches (which we'll talk about in a later section).


[ACCORDION title="💡 Why branch even for small edits?"]
Even a one-line typo fix should go on a branch in a collaborative repo. The value of the rule 
comes from it being consistent. If you introduce exceptions for "small" changes, everyone makes 
judgment calls about what counts as small enough, and occasionally someone misjudges. Once the 
workflow is smooth, creating a branch and opening a PR takes about 60 seconds.
[/ACCORDION]


[ACCORDION title="💡 Can a PR stay open without merging?"]
Yes! A PR is a *request* and a conversation, not a guaranteed merge. It can be merged, closed 
without merging, or left open while discussion continues. Some repos also have long-running 
branches that never get deleted.
[/ACCORDION]

[QUIZ id="quiz-4a"]
Q: How can you best avoid merge conflicts with "origin/main"?
- Push to main
- Update your code meticulously by hand
- Give up
* Pull from main, often
[/QUIZ]
