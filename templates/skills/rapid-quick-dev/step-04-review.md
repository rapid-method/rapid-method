# Step 4: Review & Present

## Objective
Review implementation and present results.

## Actions

### 4.1 Generate Diff
```bash
git diff {baseline_commit}..HEAD
```

### 4.2 Self-Review

Check against:
1. Spec Intent - Does it match?
2. Acceptance Criteria - All satisfied?
3. Project Patterns - Followed?
4. Edge Cases - Handled?

### 4.3 Classify Findings

| Type | Action |
|------|--------|
| `intent_gap` | HALT - needs user decision |
| `bad_spec` | Note for user |
| `patch` | Auto-fix |
| `defer` | Add to backlog |
| `noise` | Ignore |

### 4.4 Review Order

Create suggested review order:
- Order by concern
- Lead with entry point
- End with tests/config

```markdown
## Review Order
1. [main.ts:42](src/main.ts#L42) -- Entry point
2. [helper.ts:10](src/helper.ts#L10) -- Utility
3. [test.ts:1](tests/test.ts#L1) -- Tests
```

### 4.5 Update Status
Set spec status: `done`

### 4.6 Present

```markdown
## Complete ✓

**Spec**: {title}
**Branch**: {branch}
**Baseline**: {commit}

### Changes
- {count} files modified
- +{added} -{removed} lines

### Files
- `file.ts:42` -- Description

### Verification
- Tests: ✓
- Build: ✓
- Lint: ✓

---
[C] Commit  [P] Create PR  [R] Review diff  [X] Discard
```

### 4.7 Handle Choice

**[C] Commit:**
```bash
git add -A
git commit -m "{type}({scope}): {description}"
```

**[P] Create PR:**
- Commit if needed
- Push branch
- Create PR with spec summary

**[R] Review:**
- Show full diff
- Walk through review order

**[X] Discard:**
- Confirm
- `git checkout -- .`

## Done

```
What's next?
- rapid quick-dev "next task"
- View specs in _rapid/output/specs/
```
