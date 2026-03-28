# Step 1: Clarify & Branch

## Objective
Understand intent, create feature branch, route to correct path.

## Actions

### 1.1 Load Context
- Load `_rapid/config.yaml`
- Read `_rapid/project-context.md` if exists
- Read `_rapid/project-patterns.md` if exists
- Communicate in `{communication_language}`

### 1.2 Determine Intent
1. **Explicit**: User provided clear task
2. **Conversation**: Extract from recent messages
3. **Ask**: If unclear, ask user

**DO NOT FANTASIZE** - If ambiguous, HALT and ask.

### 1.3 Git Check
```bash
git status
```
- Warn if dirty working tree
- Confirm correct base branch

### 1.4 Create Branch

**Prefixes:**
| Type | Prefix |
|------|--------|
| Feature | `feature/` |
| Bug fix | `fix/` |
| Refactor | `refactor/` |
| Chore | `chore/` |
| Docs | `docs/` |
| Performance | `perf/` |
| Hotfix | `hotfix/` |

**Rules:**
- Lowercase, kebab-case
- Short but descriptive
- Include ticket if available: `feature/ABC-123-user-auth`

**Confirm:**
```
Creating branch: feature/user-authentication
Base: main

[Y] Create  [C] Change name  [S] Skip
```

If approved:
```bash
git checkout -b {branch_name}
```

### 1.5 Scope Check
**Single focused task?**
- YES: Continue
- NO (multiple goals): Ask to split or keep

### 1.6 Route

**Zero Blast Radius?** (All must be true)
- No architectural decisions
- No shared state modified
- Clear, isolated change

| Condition | Path |
|-----------|------|
| Zero blast radius | → `step-oneshot.md` |
| Everything else | → `step-02-spec.md` |

## Output
- `intent`: Task description
- `branch`: Branch name
- `path`: "spec" or "oneshot"
