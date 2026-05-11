---
name: vscode-add-keybinding
description: >
  Add a new keybinding to the user's VSCode keybindings.json for their current
  OS. Use this skill when the user wants to add, bind, or remap a VSCode
  keyboard shortcut. The user provides a key combination, a VSCode command/action,
  and optionally a when-clause condition.
metadata:
  short-description: Add a VSCode keybinding for the current OS
---

# vscode-add-keybinding

Add a new user-defined keybinding to the correct VSCode `keybindings.json` for
the current OS, following consistent cross-platform conventions.

## Inputs

- `key`: the key combination using the modifier relevant to the user's OS
  (e.g. `ctrl+\`, `cmd+k`, `shift+ctrl+p`). The user may provide either `ctrl`
  or `cmd` — normalise automatically per OS.
- `command`: the VSCode command ID to bind (e.g.
  `workbench.action.terminal.split`). If the user describes an action in plain
  English, resolve it to the correct VSCode command ID using your knowledge of
  VSCode commands and the [VSCode keybindings reference](https://code.visualstudio.com/docs/getstarted/keybindings).
- `when` *(optional)*: a VSCode `when`-clause expression (e.g.
  `terminalFocus`, `editorTextFocus && !editorReadonly`). If the user does not
  specify a condition, omit the `when` field entirely.

## Steps

### 1. Resolve the keybindings.json path for the current OS

Detect the current OS and resolve the path:

| OS | Path |
|----|------|
| macOS | `~/Library/Application Support/Code/User/keybindings.json` |
| Windows (native) | `C:\Users\<user>\AppData\Roaming\Code\User\keybindings.json` |
| Windows (WSL) | `/mnt/c/Users/<user>/AppData/Roaming/Code/User/keybindings.json` |
| Linux | `~/.config/Code/User/keybindings.json` |

Use `uname -s` and check for `/mnt/c/Users` to distinguish WSL from native Linux.
Expand `~` and `<user>` to the actual home directory / username.

### 2. Normalise the key binding per OS

- **macOS**: replace `ctrl+` prefix with `cmd+` (top-level modifier only).
- **Windows / Linux**: use `ctrl+` as-is.

The `when` clause must include an OS guard:
- macOS: append `&& isMac`
- Windows + Linux: append `&& (isWindows || isLinux)`

If the user already included an OS guard in their `when` clause, do not duplicate it.

### 3. Read the current keybindings.json

Read the file and parse the JSON array of keybinding objects.

### 4. Check for conflicts

Scan the existing entries for any binding where:
- `key` matches the normalised key for this OS, **and**
- `command` does **not** start with `-` (i.e. it is an active binding, not a removal), **and**
- the `when` clause is compatible (same or overlapping condition, or absent).

If a conflict is found:
- **Report it to the user**: show the conflicting entry in full.
- **Do not modify the file.**
- Ask the user to resolve the conflict (remove the old binding, choose a different key, or confirm they want to override) before proceeding.

### 5. Add the new binding

Append the new entry (or entries) to the JSON array and write the file back,
preserving formatting (4-space indentation, trailing newline).

For a cross-platform binding, append **two** entries — one for macOS and one
for Windows/Linux — unless the current OS is the only target:

```json
{
    "key": "cmd+\\",
    "command": "workbench.action.terminal.split",
    "when": "terminalFocus && isMac"
},
{
    "key": "ctrl+\\",
    "command": "workbench.action.terminal.split",
    "when": "terminalFocus && (isWindows || isLinux)"
}
```

If no `when` condition was specified, omit the `when` field from both entries.

### 6. Confirm to the user

Report the entries that were added, and the file path that was modified.

## Output

A confirmation message listing the added keybinding entries and the file path,
e.g.:

> Added to `~/.config/Code/User/keybindings.json`:
>
> - `ctrl+\` → `workbench.action.terminal.split` (when `terminalFocus && (isWindows || isLinux)`)
> - `cmd+\` → `workbench.action.terminal.split` (when `terminalFocus && isMac`) *(written for cross-platform parity)*
