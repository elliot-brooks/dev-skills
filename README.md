# dev-agent-skills

A collection of Codex skills and agent configuration for development workflows.

## Skills

| Name | Description | MCP Server |
|------|-------------|------------|
| `confluence-find-page` | Find and rank relevant Confluence pages for one or more prompts, with confidence-labelled page links. | `confluence_mcp_readonly` |
| `jira-find-ticket` | Find and rank Jira tickets matching one or more natural-language prompts. | `jira_mcp_readonly` |
| `jira-ticket-breakdown` | Fetch a Jira issue and produce a concise markdown breakdown of key metadata and description. | `jira_mcp_readonly` |
| `notion-find-page` | Find the best matching Notion page, database, or data source from a query, title, URL, or hint. | `notion` |
| `notion-query-database` | Query an arbitrary Notion database or data source after discovering its schema. | `notion` |
| `notion-update-page` | Safely update an existing Notion page after previewing the proposed change and receiving confirmation. | `notion` |
| `update-branch` | Merge `origin/main` into the current branch with `git merge --no-ff` | — |
| `vscode-add-keybinding` | Add a keybinding to the user's VSCode `keybindings.json` for their current OS | — |

## Useful Resources

- [Production Grade Engineering Skills](https://github.com/addyosmani/agent-skills#)
- [OpenAi Codex Docs](https://developers.openai.com/codex/skills)
