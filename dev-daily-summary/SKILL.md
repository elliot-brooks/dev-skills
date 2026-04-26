---
name: dev-daily-summary
description: >
  Fetch and display a prioritised daily task summary from the Developer Brain
  Notion workspace. Use this skill when the user asks for their tasks, what
  they need to do today, or a daily summary.
metadata:
  short-description: Show today's prioritised task list from Developer Brain
---

# dev-daily-summary

Fetch the **All Tasks** view from the Developer Brain Tasks database and return
a concise, prioritised TODO list ordered by due date, excluding completed tasks.

## Inputs

None required. Uses the current date to determine overdue and due-soon status.

## Steps

1. Call `notion-notion-search` with:
   - `query`: `"Developer Brain Tasks"`
   - `filters`: `{}`
   - From the results, identify the **Tasks** database nested under the **Developer Brain** page.
   - Call `notion-notion-fetch` on that database to retrieve its data source URL from the `<data-source>` tag in the response.

2. Fetch individual task pages from the data source. For each task, collect:
   - `Name`
   - `Status` — skip tasks with status `Done` or `Won't Complete`
   - `date:Due:start`

3. Sort remaining tasks by `date:Due:start` ascending (nulls last).

4. Classify each task by due date relative to today:
   - 🔴 **Overdue** — due date is before today
   - 🟡 **Due soon** — due date is within the next 2 days (inclusive)
   - No icon — due further in the future or unscheduled

## Output

Render the list in this exact format:

---
## TODO

**Key:** 🔴 Overdue · 🟡 Due soon (< 2 days)

- 🔴 Task name *(due DD Mon)*
- 🟡 Task name *(due DD Mon)*
- Task name *(due DD Mon)*
- Task name *(no due date)*

---
