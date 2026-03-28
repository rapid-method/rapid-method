# One-Shot (Fast Track)

## When to Use
ALL must be true:
- [ ] No architectural decisions
- [ ] No shared state modified
- [ ] Clear, isolated change
- [ ] Crystal clear intent

## Flow

### 1. Confirm
```
Quick change: {description}
Files: {file_list}
Proceed? [Y/N]
```

### 2. Baseline
```bash
git rev-parse HEAD
```

### 3. Implement
- Make the change
- Follow patterns
- Keep minimal

### 4. Verify
```bash
{test_command}
{lint_command}
```

### 5. Quick Review
- Check diff
- Fix obvious issues

### 6. Present
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

### 7. Commit
```bash
git add -A
git commit -m "{type}: {description}"
```

## Escalation

If more complex than expected:
```
This is more complex than expected.
Switching to full spec path.
```
→ Go to `step-02-spec.md`
