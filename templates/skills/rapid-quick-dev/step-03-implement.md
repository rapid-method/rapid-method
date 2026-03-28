# Step 3: Implement

## Objective
Execute implementation following approved spec.

## Actions

### 3.1 Capture Baseline
```bash
git rev-parse HEAD
```
Store as `baseline_commit` in spec.

### 3.2 Update Status
Set spec status: `in-progress`

### 3.3 Execute Tasks

For each task:
1. Read frozen section (Intent, Boundaries)
2. Implement following task description
3. Follow `project-patterns.md`
4. Mark task `[x]`
5. Verify acceptance criteria

### 3.4 Rules

**DO:**
- Follow existing patterns
- Keep changes minimal
- Write clean code
- Respect boundaries

**DON'T:**
- Change outside scope
- Refactor unrelated code
- Add unspecified features

### 3.5 Verify

```bash
{test_command}
{build_command}
{lint_command}
```

### 3.6 Self-Check

Before proceeding:
- [ ] All tasks `[x]`
- [ ] All ACs met
- [ ] Tests pass
- [ ] Build succeeds
- [ ] No lint errors

**If fails:** Fix and re-verify.

## Output
- Implementation complete
- Status: `in-progress`
- Verification passed

## Next
- If `enable_review: true` → `step-04-review.md`
- If `enable_review: false` → Present and offer commit
