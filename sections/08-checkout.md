The `checkout` command historically does three pretty different things — navigating branches, restoring files, and time-traveling to old commits. With git version 2.23, they introduced `switch` and `restore` to make this clearer. You can still use `checkout` for everything if you want — most older documentation and even AI chatbots still use it.

The table below shows both options side by side. This lesson uses the newer `switch` commands, but you'll recognize either in the wild.
