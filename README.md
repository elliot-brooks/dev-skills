# dev-agent-skills

A collection of agent skills for developer productivity.

## Skills

| Name | Description | MCP Server |
|------|-------------|------------|
| `confluence-find-page` | Find matching Confluence pages for one or more prompts | `confluence_mcp_readonly` |
| `dev-daily-summary` | Fetch and display a prioritised daily task list from the Developer Brain Notion workspace | `notion` |
| `dev-notes-query` | Query the Developer Brain Notes database to answer knowledge-based questions | `notion` |
| `dev-resource-query` | Retrieve saved resources from the Developer Brain Resources database | `notion` |
| `dev-snippets-query` | Retrieve saved code snippets from the Developer Brain Snippets database | `notion` |
| `dev-update-note` | Create or amend Developer Brain Notes with preview and confirmation | `notion` |
| `jira-standup-draft` | Draft concise standup updates from Jira activity | `jira_mcp_readonly` |
| `jira-ticket-brief` | Build an actionable checklist from a Jira ticket | `jira_mcp_readonly` |
| `jira-work-queue` | Summarize and prioritize a Jira work queue | `jira_mcp_readonly` |
| `update-branch` | Merge `origin/main` into the current branch with `git merge --no-ff` | — |
| `vscode-add-keybinding` | Add a keybinding to the user's VSCode `keybindings.json` for their current OS | — |

## References

- [Developer Brain](https://www.notion.so/Developer-Brain-257e51091aba8266b7f581339c941adb) — Notion workspace used by the `dev-*` skills
