---
name: update-branch
description: Merge `origin/main` into the current branch with `git merge --no-ff` unless the user explicitly names a different branch or ref. Use when a user asks to bring a branch up to date through a merge instead of a rebase, and when merge conflicts should be analysed and proposed before any conflict-resolution edits are applied.
---

# Update Branch

## Task
- Use this skill when the user wants the current branch updated by merging the default integration branch.
- Use it for `--no-ff` merges that should either finish as a merge commit or stop with a conflict-resolution proposal for user approval.
- Use `origin/main` by default. If the user explicitly names a different branch or ref, use that exact merge target instead.
- Do not use it for rebases or cherry-picks.
- Primary goal: merge the selected target into the current branch without guessing through ambiguity or silently resolving conflicts.

## Expectations
- Start with `git status --short --branch` and `git branch --show-current`.
- Stop on detached `HEAD`.
- Stop before merging if the worktree or index is dirty. Explain that the merge should start from a clean state unless the user explicitly wants help handling local changes first.
- Choose `merge_target`:
  - Use `origin/main` when the user does not specify a branch or ref.
  - Use the user-specified branch or ref exactly when they do specify one.
- Run `git fetch --prune origin` before merging `origin/main`.
- If the user-specified merge target is a remote ref such as `origin/release/x`, fetch that remote first with `git fetch --prune <remote>`.
- Run `git merge --no-ff <merge_target>`.
- If the merge succeeds, report the merge target and resulting merge commit.
- If the merge conflicts, inspect the conflicted files and explain the concrete edits needed to resolve them.
- After suggesting conflict resolutions, ask the user whether to implement them. Do not edit conflicted files, stage files, or finish the merge before approval.
- After approval, re-read each conflicted file before editing, make the smallest valid resolution, stage the resolved files, and complete the merge.
- Run the smallest meaningful validation after conflict resolution when the affected code has a clear local build or test entry point. State when no reliable validation was run.
- Final output should include the current branch, merge target, commands run, whether the merge committed or stopped on conflicts, validation run, and any blockers.

## Conflict Handling
- Reason from both sides of the conflict and the surrounding code, not from conflict markers alone.
- Preserve both sides when they are compatible. Prefer one side only when the other side is clearly obsolete, duplicated, or incorrect.
- Call out semantic uncertainty, missing tests, or compatibility risk before asking for approval.
- If the repo is left mid-merge, say so explicitly and leave the worktree untouched until the user decides.

## Assets
- Git commands used by this skill:
  - `git status --short --branch`
  - `git branch --show-current`
  - `git fetch --prune origin`
  - `git fetch --prune <remote>`
  - `git merge --no-ff <merge_target>`
