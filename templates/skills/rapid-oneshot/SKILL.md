# RAPID Oneshot

Fast path for simple, isolated changes. Part of the RAPID development workflow.

## Trigger
- User says "rapid oneshot" or "oneshot"
- User has a small, clearly isolated change

## When to Use

ALL must be true:
- [ ] No architectural decisions
- [ ] No shared state modified
- [ ] Clear, isolated change
- [ ] Crystal clear intent

If any condition is false → use `rapid create-spec` + `rapid dev` instead.

## Prerequisites
- Load `_rapid/config.yaml`
- Load `_rapid/project-architecture.md` if exists
- Load `_rapid/project-patterns.md` if exists
- Communicate in `{communication_language}`

## Workflow

### 1. Clarify

Understand what the user wants:
1. **Explicit**: User provided clear task
2. **Conversation**: Extract from recent messages
3. **Ask**: If unclear, ask user

**DO NOT FANTASIZE** — if ambiguous, HALT and ask.

### 2. Confirm Scope

```
Quick change: {description}
Files: {file_list}

Zero blast radius?
- [x] No architectural decisions
- [x] No shared state modified
- [x] Clear, isolated change

Proceed? [Y/N]
```

### 3. Create Branch

```bash
git checkout -b {prefix}/{slug}
```

Use semantic prefix (fix/, chore/, docs/, etc.).

### 4. Baseline

```bash
git rev-parse HEAD
```

### 5. Implement

- Make the change
- Follow project patterns
- Keep minimal

### 6. Verify

```bash
{test_command}
{lint_command}
```

### 7. Quick Review

- Check diff for obvious issues
- Auto-fix if needed

### 8. Present

```markdown
## Quick Change ✓

**Change**: {description}
**Branch**: {branch}

### Diff
{summary}

### Verify
- Tests: ✓
- Lint: ✓

---
[C] Commit  [X] Discard
```

### 9. Commit

```bash
git add -A
git commit -m "{type}: {description}"
```

## Escalation

If more complex than expected:
```
This is more complex than expected.
Use `rapid create-spec` to create a proper spec first.
```
→ Abort oneshot, guide user to `rapid create-spec`

## Output
- Change committed on feature branch
- Ready for human PR creation
