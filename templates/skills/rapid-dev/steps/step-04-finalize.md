# Step 4: Finalize — Review, Resolve, Commit

**Goal**: Present the complete implementation with diff, findings, and verification status. Resolve open findings. Commit on approval. This is **user interaction #2 of 2**.

**Previous step**: [step-03-audit.md](step-03-audit.md)

---

## 1. Build the Review Order

Suggest an order for the user to read the diff in. Lead with what matters most:

1. **Entry points** — files that callers hit (controllers, exported APIs)
2. **Core logic** — services, business rules
3. **Supporting** — helpers, utilities
4. **Tests** — verifying the above
5. **Config / scaffolding** — last

```markdown
## Suggested Review Order
1. [src/api/signup.controller.ts:42](src/api/signup.controller.ts#L42) — entry point
2. [src/services/email.service.ts:88](src/services/email.service.ts#L88) — core logic
3. [src/services/email.service.test.ts:1](src/services/email.service.test.ts#L1) — tests
```

## 2. Present Implementation (User Interaction #2)

```markdown
## Implementation Complete: {spec_title}

**Spec**: `{spec_path}`
**Branch**: `{branch}`
**Baseline**: `{baseline_commit_short}`

### Stats
- Files changed: {file_count}
- Lines: +{added} -{removed}
- Tasks: {n_done}/{n_total}

### Verification
- Tests: {pass_count}/{total} passing
- Lint: {ok | n issues}
- Type check: {ok | n issues}
- Build: {ok | failed}

### Suggested Review Order
{ordered file list with line links}

### AI Self-Audit Findings

{If findings_fixed is non-empty}
**Auto-fixed during audit ({n}):**
| ID | Severity | Type | Description |
|----|----------|------|-------------|
| F4 | Low | code_smell | Magic number 42 → named constant |

{If findings_open is non-empty}
**Open ({n}):**
| ID | Severity | Type | Description | File |
|----|----------|------|-------------|------|
| F2 | High | missing_ac | AC #3 not satisfied | src/y.ts:10 |
| F3 | Medium | pattern_violation | Callback instead of async/await | src/z.ts:88 |

---

How do you want to handle the open findings?

[W] Walk through each
[F] Fix all auto-fixable (pattern_violation + code_smell)
[A] Acknowledge all and proceed
[D] Show full diff before deciding
```

## 3. Handle Findings Choice

### [W] Walk through
For each open finding, in severity order (Critical → High → Medium → Low → Info):

```
{F_id} ({severity}): {description}
File: {file:line}

[F] Fix now  [S] Skip (acknowledge)  [Q] Question/discuss
```

- **[F]** → apply the fix, mark as resolved
- **[S]** → mark acknowledged, keep moving
- **[Q]** → answer the user's question, then re-ask

After all findings processed, re-run verification commands silently. If anything broke, surface it.

Then return to section 2 with updated findings table.

### [F] Fix all auto-fixable
- Apply fixes for all `pattern_violation` and `code_smell` findings
- Skip `missing_ac` (those need user judgment about what's actually missing)
- Skip `suggestion` (those are improvements, not bugs)
- Re-run verification
- Re-present (loop back to section 2)

### [A] Acknowledge all and proceed
- Mark all open findings as acknowledged
- Continue to section 4

### [D] Show full diff
- Display the full `git diff {baseline_commit}` output
- Re-present (loop back to section 2)

## 4. Final Approval

Once findings are resolved/acknowledged and verification is clean:

```
Ready to commit.

**Commit message preview:**
{type}({scope}): {description}

Refs: {spec_path}

[C] Commit  [E] Edit message  [D] Discard everything
```

### [C] Commit
```bash
git add -A
git commit -m "{type}({scope}): {description}

Refs: {spec_path}"
```

→ continue to section 5

### [E] Edit message
- Ask: "What should the commit message be?"
- Use the user's message verbatim
- Confirm and commit

### [D] Discard everything
```
Discard ALL changes and reset to {baseline_commit}? This cannot be undone.
[Y] Yes, discard  [N] No, keep changes
```

- **[Y]**:
  ```bash
  git checkout {baseline_commit} -- .
  git checkout {original_branch}
  git branch -D {branch}
  ```
  Update spec status back to `ready-for-dev`. Exit.
- **[N]** → return to section 2

## 5. Update Spec & Present Done

Update the spec frontmatter:
- `status: done`

Save the spec.

Present completion:

```
## Done ✓

**Spec**: {spec_title} (status: done)
**Branch**: {branch}
**Commit**: {new_commit_short}
**Files**: {file_count}

### Audit Summary
- Findings total: {total}
- Auto-fixed: {fixed_count}
- Walked / fixed in review: {walked_count}
- Acknowledged: {ack_count}

### Next
- Push the branch and open a PR
- Or run `rapid create-spec` for the next task
```

The dev workflow is complete. No more steps to load.
