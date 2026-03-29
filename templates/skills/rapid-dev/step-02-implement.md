# Step 2: Implement + AI Code Review

## Objective
Execute the approved spec tasks and self-review the implementation.

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

### 2.5 AI Code Review

Review your own implementation:

**Check against:**
1. Spec Intent — does the code do what was planned?
2. Acceptance Criteria — all satisfied?
3. Project Patterns — conventions followed?
4. Edge Cases — handled per spec?

**Classify findings:**

| Type | Action |
|------|--------|
| `intent_gap` | **HALT** — needs user decision |
| `bad_spec` | Note for user |
| `patch` | Auto-fix immediately |
| `defer` | Add to backlog |
| `noise` | Ignore |

### 2.6 Self-Check

Before proceeding:
- [ ] All tasks `[x]`
- [ ] All ACs met
- [ ] Tests pass
- [ ] Build succeeds
- [ ] No lint errors
- [ ] No `intent_gap` findings

## Output
- Implementation complete
- AI review done, patches applied
- Verification passed
- → Proceed to `step-03-review.md`
