# Step 2: Implement + AI Code Review

## Objective
Execute the approved spec tasks, verify, and perform structured AI review.

## Actions

### 2.1 Capture Baseline
```bash
git rev-parse HEAD
```
Store as `baseline_commit` in spec.

### 2.2 Execute Tasks

For each task in the spec:
1. Read frozen sections (Intent, Boundaries) — stay aligned
2. Implement following the task description
3. Follow `project-patterns.md` conventions
4. Mark task `[x]`
5. Verify acceptance criteria as you go

### 2.3 Implementation Rules

**DO:**
- Follow existing patterns
- Keep changes minimal
- Write clean code
- Respect boundaries

**DON'T:**
- Change code outside scope
- Refactor unrelated code
- Add unspecified features
- Ignore frozen sections

### 2.4 Verify

```bash
{test_command}
{build_command}
{lint_command}
```

**If fails:** Fix and re-verify. Do not proceed until all pass.

---

### 2.5 AI Code Review (Structured)

**Build complete diff:**
```bash
git diff {baseline_commit}
```

**Review against:**
1. **Intent** — Does the code do what was planned?
2. **Acceptance Criteria** — All satisfied?
3. **Project Patterns** — Conventions followed?
4. **Boundaries** — Stayed within scope?
5. **Edge Cases** — Handled per spec?

**Generate findings with IDs:**

For each issue found, assign an ID and classify:

| ID | Severity | Type | Description |
|----|----------|------|-------------|
| F1 | Critical | `intent_gap` | Deviation from spec intent |
| F2 | High | `missing_ac` | Acceptance criteria not met |
| F3 | Medium | `pattern_violation` | Project pattern not followed |
| F4 | Low | `code_smell` | Minor quality issue |
| F5 | Info | `suggestion` | Nice to have improvement |

**Finding types:**

| Type | Action |
|------|--------|
| `intent_gap` | **HALT** — needs user decision |
| `missing_ac` | Must fix before proceeding |
| `pattern_violation` | Should fix |
| `code_smell` | Auto-fix if trivial |
| `suggestion` | Note for user |

---

### 2.6 Auto-Fix Trivial Issues

**Immediately fix** (no user input needed):
- Typos in comments/strings
- Missing semicolons, formatting
- Unused imports
- Obvious code smells with clear fix

**Mark as:** `[F{n}] Auto-fixed: {description}`

---

### 2.7 Self-Check

Before proceeding, verify:
- [ ] All tasks `[x]`
- [ ] All ACs met
- [ ] Tests pass
- [ ] Build succeeds
- [ ] No lint errors
- [ ] No `intent_gap` findings
- [ ] No `missing_ac` findings

**If any `intent_gap` found:** HALT and ask user before proceeding.

---

## Output
- Implementation complete
- Findings documented with IDs
- Auto-fixes applied
- Verification passed
- → Proceed to `step-03-review.md`
