# Step 3: AI Self-Audit (Silent)

**Goal**: Build the full diff, review it against the spec, generate findings with IDs, auto-fix the trivial ones. **No user interaction in this step.**

**Previous step**: [step-02-execute.md](step-02-execute.md)
**Next step**: [step-04-finalize.md](step-04-finalize.md)

---

## 1. Build the Diff

Silently:

```bash
git diff {baseline_commit}
git diff {baseline_commit} --stat
```

Hold internally:
- `diff_full` — the actual diff
- `files_changed_count`, `lines_added`, `lines_removed`
- `files_changed_list` — paths

Cross-check `files_changed_list` against the spec's Code Map:
- Every file in the diff should be in the Code Map
- If any file in the diff is **not** in the Code Map → that's an `out_of_scope` finding (severity High)

## 2. Review Against Spec

For each section of the spec, generate findings:

### Intent
- Does the diff actually solve the Problem?
- Does the implementation match the Approach?
- Any deviation → `intent_gap` finding (Critical)

### Acceptance Criteria
- Walk each AC
- Is it satisfied by the diff? Can you point to the lines that prove it?
- Unmet AC → `missing_ac` finding (High)

### Boundaries
- Did any change touch something the `Never` list forbids? → `boundary_violation` (Critical)
- Did any change do something the `Ask First` list says needs approval? → `unauthorized_action` (High)
- Did any change skip something the `Always` list requires? → `missing_required` (High)

### Patterns
- Does the new code follow conventions from `_rapid-output/patterns.md` and adjacent code?
- Mismatches → `pattern_violation` (Medium)

### Edge Cases
- Are the I/O table's edge cases and error scenarios actually handled?
- Missing handling → `missing_edge_case` (Medium)

### Code Quality
- Obvious smells, dead code, unused imports, magic numbers, missing error handling
- → `code_smell` (Low)

### Suggestions
- Things that aren't bugs but could be improvements
- → `suggestion` (Info)

## 3. Findings Table

Build the findings list. Assign each a sequential ID and capture severity + type:

```
| ID  | Severity | Type                | Description                              | File:Line       |
|-----|----------|---------------------|------------------------------------------|-----------------|
| F1  | Critical | intent_gap          | ...                                      | src/x.ts:42     |
| F2  | High     | missing_ac          | AC #3 not satisfied                      | src/y.ts:10     |
| F3  | Medium   | pattern_violation   | Using callback instead of async/await    | src/z.ts:88     |
| F4  | Low      | code_smell          | Magic number 42                          | src/x.ts:55     |
| F5  | Info     | suggestion          | Could extract to helper                  | src/y.ts:30     |
```

## 4. Auto-Fix Trivial Findings

Apply fixes **immediately, without asking** for findings that are clearly safe:

### Auto-fix
- Typos in comments and strings
- Missing semicolons / formatting issues
- Unused imports
- Trivial code smells with an obvious fix (e.g. extract magic number to a named constant)
- Any finding the project's lint/format tool would auto-fix

### Mark as fixed
After fixing, update the finding row:

```
| F4  | Low      | code_smell          | Magic number 42                          | src/x.ts:55     | Auto-fixed |
```

## 5. Re-Verify After Auto-Fix

If you applied any auto-fixes, re-run the verification commands:

```bash
{test_command}
{lint_command}
```

If anything broke, fix it. Do not proceed to step-04 with broken verification.

## 6. Critical Finding Halt (Conditional)

If any finding is `intent_gap` or `boundary_violation` (severity Critical):

→ **HALT and surface to user immediately.** Do not proceed to step-04.

```
HALT — Critical finding during self-audit.

{finding row in detail}

I cannot finalize this implementation without your input on this. Options:
[A] Update the spec to allow this and continue
[B] Revert the offending change and pick a different approach
[C] Stop and discuss
```

This is the only halt allowed in step-03.

**For all other severities** (High, Medium, Low, Info): hold the findings for step-04. Do not halt.

## 7. Build Audit Summary

Hold internally for step-04:
- `findings_open` — High/Medium/Low/Info findings still unresolved
- `findings_fixed` — Auto-fixed findings
- `verification_status` — pass/fail for each verification command
- `audit_passed` — true if no Critical findings remain

## 8. Transition (silent — no user halt)

Move directly to finalize.

→ Read fully and follow [step-04-finalize.md](step-04-finalize.md).
