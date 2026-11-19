# Agent rules

This repo checks that the Hermes → Claude Code / Codex → GitHub CI pipeline works.

- Never commit to `main`. Work on a branch named `agent/<short-task>` in its own git worktree under `.worktrees/`.
- Before opening a PR, run `npm run lint` and `npm test`; both must pass.
- Open PRs against `ajh1004ajh00/hermes-sandbox` `main` only. Merging needs CI green and a human approval in Discord.
- Keep changes small. Add or update tests in `test/` for every behaviour change.
- Roles: Claude Code implements. Codex reviews read-only and reports findings; it does not push.
