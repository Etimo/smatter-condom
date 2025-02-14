# smatter-condom

A proxy repository, which is pushed to from the `smatter` repository (created from using the `smatter-cli` tool). Pushes to this repository triggers a workflow that shuffles the branch contents to the `smatter-submit`repository.

The external "smatter-submitter" service account has write access to this repository. The service account's write PAT is exposed publicly in the `smatter-cli` repository.

