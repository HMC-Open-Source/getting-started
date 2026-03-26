Here's the full lifecycle of a contribution — from branching off main to cleaning up after 
merge.

<!-- Path for images must be in this format. Local testing might not work -->
![git workflow diagram](/getting-started/images/workflow-diagram.svg)

The important thing to notice is that main appears at both the start and end. Main is a 
continuous, stable timeline. Your branch is a temporary workspace that lives alongside it, 
then gets folded back in.

[CALLOUT type="warning"]
Merge conflicts may appear when you pull main into your branch mid-work. Resolve them on your 
branch before pushing — not in the PR. This keeps the reviewer's job clean.
[/CALLOUT]
