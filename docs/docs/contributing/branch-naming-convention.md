---
sidebar_position: 1
---

# Branch Naming Convention

Our project follows a structured branch naming convention to maintain consistency and clarity when managing development tasks. Each branch name includes three parts:

1. **Branch Type Prefix**: Defines the type of work being done.

   - `task/` – For general tasks that do not fall under bug fixes or new features.
   - `bug/` – For fixing bugs.
   - `story/` or `feature/` – For implementing new features or user stories.
   - `docs/` – For documentation-related changes.

2. **Ticket Number**: The identifier from the project management tool (e.g., Jira or GitHub Issues).

   - Use `scrum-<ticket_number>` for tasks from the Jira Scrum board.
   - Use `github-<issue_number>` for GitHub issues.

3. **Description**: A brief, lowercase description of the branch’s purpose, separated by hyphens (`-`).

**Format**:
```html
<type>/<ticket-source>-<ticket-number>-<short-description>
```

**Examples**:

- `feature/scrum-80-add-authentication-flow`
- `bug/github-40-fix-login-error`
- `docs/scrum-25-update-readme`

This naming convention helps keep branches organized and makes it easier to track progress across different tools and tasks.
