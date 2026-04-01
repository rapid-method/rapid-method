# RAPID Oneshot

Fast path for simple, isolated changes. Skips the spec process for truly trivial work.

## Trigger
- User says "rapid oneshot" or "oneshot"
- User has a small, clearly isolated change

## Prerequisites
- Load `_rapid/config.yaml`
- Load `_rapid/project-architecture.md` if exists
- Load all rules from `_rapid/rules/*.md` if exists
- Communicate in `{communication_language}`

## Workflow

### 1. Capture & Quick Scan

**Get the user's request** (they may have already said it).

**Immediately scan** to understand scope:
- Search for files/areas mentioned
- Check what would be affected
- Identify dependencies

---

### 2. Complexity Check

**Evaluate complexity signals:**

| Signal | Weight |
|--------|--------|
| Multiple components mentioned | +2 |
| Shared state modified | +2 |
| New patterns needed | +2 |
| Cross-layer changes (UI + API + DB) | +2 |
| Uncertainty in approach | +1 |
| Multiple files affected | +1 |

| Reducer | Weight |
|---------|--------|
| Single file change | -2 |
| Isolated function/method | -2 |
| Clear pattern exists | -1 |
| User said "simple/quick/just" | -1 |

**Calculate score:**

- **Score ≤ 0**: Proceed with oneshot
- **Score 1-2**: Warn but allow
- **Score ≥ 3**: Escalate

---

### 3. Handle Complexity

**If Score ≤ 0 (Simple):**
```
Quick change: {description}
Files: {file_list}

Proceed? [Y/N]
```

**If Score 1-2 (Borderline):**
```
This looks slightly complex:
- {reason_1}
- {reason_2}

Options:
[Y] Proceed anyway (at your own risk)
[S] Create a spec first (recommended)
```

**If Score ≥ 3 (Escalate):**
```
This is too complex for oneshot:
- {reason_1}
- {reason_2}
- {reason_3}

Run `rapid create-spec` to plan this properly.
```
→ **EXIT oneshot**

---

### 4. Execute (If Proceeding)

a) **Create branch:**
```bash
git checkout -b {prefix}/{slug}
```
Use semantic prefix: fix/, chore/, docs/, refactor/, perf/

b) **Capture baseline:**
```bash
git rev-parse HEAD
```

c) **Implement:**
- Make the change
- Follow project patterns
- Keep minimal

d) **Verify:**
```bash
{test_command}
{lint_command}
```

---

### 5. Quick Review

**Self-check the diff:**
- Any unexpected changes? → Revert and explain
- Obvious issues? → Auto-fix
- Scope creep? → Warn user

---

### 6. Present

```markdown
## Quick Change Done

**Change:** {description}
**Branch:** {branch}
**Files:** {count}

### Diff Summary
{summary}

### Verification
- Tests: {status}
- Lint: {status}

---
[C] Commit  [R] Review diff  [X] Discard
```

**Handle choice:**

- `[C] Commit`:
  ```bash
  git add -A
  git commit -m "{type}: {description}"
  ```
  Done.

- `[R] Review`:
  - Show full diff
  - After review, re-present options

- `[X] Discard`:
  - Confirm: "Discard all changes? (y/n)"
  - If yes: `git checkout -- .`

---

## Flow Summary

```
[Capture + Scan] → [Complexity Check] → [Execute] → [Review] → [Commit]
       ↓                   ↓                ↓          ↓          ↓
    (silent)         Simple? Warn?      (silent)   (silent)     C/R/X
                     Escalate?
```

Only 2 user interactions: Confirm scope → Commit

---

## Escalation Triggers (Auto-Exit)

The following **always** trigger escalation to `rapid create-spec`:
- User mentions "architecture" or "design decision"
- Change affects more than 3 files
- New external dependency needed
- Breaking change to existing API
- User is uncertain: "I'm not sure", "maybe", "best way to"

---

## Output
- Change committed on semantic branch
- Ready for PR
