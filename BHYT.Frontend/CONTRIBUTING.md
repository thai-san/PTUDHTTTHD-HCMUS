## How to Contribute

- **Use GitHub Issues and Pull Requests**: All proposed changes should be submitted through GitHub issues and pull requests (PRs).

- **Don't Push Directly to Main and Develop**: To maintain code integrity, avoid pushing changes directly to the `main` and `develop` branches.

- **Create a Feature Branch**: When developing new features or changes, create a new branch from `develop`.

- **Maintain a Linear History**: Keep the history of the `develop` and feature branches linear. Prefer using `git rebase` over `git merge` to integrate changes.

- **Create a Release Branch**: Before merging into `main`, create a release branch. When merging, prefer creating a merge commit over rebasing to preserve the branch history in `main`. After a release, rebase `develop` as needed.

- **Ask for Clarification**: If you need clarification about a feature, comment on the relevant GitHub issue. This ensures that all discussions are tracked.

- **Resolve Conflicts Before Review**: Before requesting a PR review, resolve all merge conflicts. Use `git rebase` to resolve conflicts in a feature branch. Avoid using `git merge` for this purpose.
