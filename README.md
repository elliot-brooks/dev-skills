# agentic-workflows

A collection of agentic workflows such as skills / agents to aid development

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
| `notion-find-page` | Find the best matching Notion page, database, or data source | `notion` |
| `notion-query-database` | Query an arbitrary Notion database or data source after inspecting its schema | `notion` |
| `notion-update-page` | Safely update an existing Notion page with preview and confirmation | `notion` |
| `update-branch` | Merge `origin/main` into the current branch with `git merge --no-ff` | — |
| `vscode-add-keybinding` | Add a keybinding to the user's VSCode `keybindings.json` for their current OS | — |

## Useful Resources

- [Production Grade Engineering Skills](https://github.com/addyosmani/agent-skills#)
- [OpenAi Codex Docs](https://developers.openai.com/codex/skills)
