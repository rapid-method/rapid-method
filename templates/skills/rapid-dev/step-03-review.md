# Step 3: Human Code Review

## Objective
Present the implementation for human review and decision.

## Actions

### 3.1 Generate Diff
```bash
git diff {baseline_commit}..HEAD
```

### 3.2 Review Order

Create a suggested review order:
- Order by concern
- Lead with entry point
- End with tests/config

```markdown
## Suggested Review Order
1. [main.ts:42](src/main.ts#L42) -- Entry point changes
2. [helper.ts:10](src/helper.ts#L10) -- New utility
3. [test.ts:1](tests/test.ts#L1) -- Tests
```

### 3.3 Update Spec Status
Set spec status: `done`

### 3.4 Present Results

```markdown
## Implementation Complete ✓

**Spec**: {title}
**Branch**: {branch}
**Baseline**: {commit}

### Changes
- {count} files modified
- +{added} -{removed} lines

### Files
- `file.ts:42` -- Description

### AI Review
- intent_gap: 0
- patches applied: {count}
- deferred: {count}

### Verification
- Tests: ✓
- Build: ✓
- Lint: ✓

---
[C] Commit  [R] Review diff  [X] Discard
```

### 3.5 Handle Choice

**[C] Commit:**
```bash
git add -A
git commit -m "{type}({scope}): {description}"
```

**[R] Review:**
- Show full diff
- Walk through suggested review order
- After review, re-present options

**[X] Discard:**
- Confirm with user
- `git checkout -- .`

## Done

```
What's next?
- rapid create-spec → rapid dev (next task)
- View specs in _rapid/output/specs/
```
