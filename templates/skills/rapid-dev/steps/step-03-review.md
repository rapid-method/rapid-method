# Step 3: Human Review + Findings Resolution

## Objective
Present implementation for review, resolve remaining findings, and commit.

## Actions

### 3.1 Generate Diff
```bash
git diff {baseline_commit}..HEAD
```

### 3.2 Build Review Summary

**Suggested review order:**
- Order by concern (most important first)
- Lead with entry point changes
- End with tests/config

```markdown
## Review Order
1. [main.ts:42](src/main.ts#L42) -- Entry point changes
2. [helper.ts:10](src/helper.ts#L10) -- New utility
3. [test.ts:1](tests/test.ts#L1) -- Tests
```

---

### 3.3 Present Findings (If Any)

**If findings remain from step 2:**

```markdown
## AI Review Findings

| ID | Severity | Type | Description | Status |
|----|----------|------|-------------|--------|
| F1 | Medium | pattern_violation | Using callback instead of async/await | Open |
| F2 | Low | suggestion | Could extract to helper function | Open |
| F3 | Low | code_smell | Magic number on line 42 | Auto-fixed |

---
How to handle open findings?

[W] Walk through each
[F] Fix all fixable
[S] Skip (acknowledge and proceed)
```

**Handle choice:**

- `[W] Walk through`:
  For each open finding:
  ```
  F1 (Medium): Using callback instead of async/await
  Location: src/service.ts:25

  [F] Fix now  [S] Skip  [D] Discuss
  ```
  - `[F]`: Apply fix, mark resolved
  - `[S]`: Mark acknowledged, continue
  - `[D]`: Explain context, re-ask

- `[F] Fix all`:
  - Apply fixes for all `pattern_violation` and `code_smell`
  - Skip `suggestion` (just note)
  - Report what was fixed

- `[S] Skip`:
  - Mark all as acknowledged
  - Continue to commit

---

### 3.4 Update Spec Status
Set spec status: `done`

---

### 3.5 Present Final Results

```markdown
## Implementation Complete

**Spec:** {title}
**Branch:** {branch}
**Baseline:** {commit}

### Changes
- {count} files modified
- +{added} -{removed} lines

### Files Changed
- `file.ts:42` -- Description

### AI Review Summary
- Findings: {total}
- Fixed: {fixed}
- Acknowledged: {acknowledged}

### Verification
- Tests: {status}
- Build: {status}
- Lint: {status}

---
[C] Commit  [R] Review diff  [X] Discard
```

---

### 3.6 Handle Choice

**[C] Commit:**
```bash
git add -A
git commit -m "{type}({scope}): {description}

Refs: {spec_file}"
```
→ Done

**[R] Review:**
- Show full diff
- Walk through suggested review order
- After review, re-present options

**[X] Discard:**
- Confirm: "Discard all changes and reset to baseline? (y/n)"
- If yes: `git checkout {baseline_commit} -- .`
- Set spec status back to `ready-for-dev`

---

## Done

```
Implementation complete!

Branch: {branch}
Spec: {spec_file} (status: done)

What's next?
- Push and create PR
- Run `rapid create-spec` for next task
```
