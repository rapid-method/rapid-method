# Step 1: Prepare — Spec, Branch, Baseline

**Goal**: Find the right spec, capture the git baseline, and create the working branch. This is **user interaction #1 of 2**.

**Next step**: [step-02-execute.md](step-02-execute.md)

---

## 1. Find the Spec

Run the shell command `npx rapid-method pending-specs`. It returns compact JSON of actionable specs, each with `status`, `title`, `created`, `branch`, and `tasks_done` / `tasks_total`. Filter to:
- `status: "in-progress"` → the **resume case** below
- `status: "ready-for-dev"` → the **fresh case** below

**Do not open any spec file to build this list** — only read the chosen spec fully in section 2.

### Resume case (status `in-progress`)

If a spec is already `in-progress`, the user has a partially-implemented branch. Greet differently:

```
Found spec in progress: **{title}**

Branch: {branch}
Tasks: {n_done}/{n_total} complete
Last touched: {date}

Resume from task {n_done + 1}?

[Y] Yes, resume  [N] No, pick a different spec
```

- **[Y]** → skip to section 5 (skip baseline + branch — they already exist), then jump to step-02
- **[N]** → continue to fresh case below

### Fresh case (status `ready-for-dev`)

If multiple `ready-for-dev` specs exist, list them:

```
Found {n} approved specs:

1. {title} — created {date}
2. {title} — created {date}

Which one are we implementing?
```

If only one exists, pick it automatically and confirm in section 4.

## 2. Read the Spec

Read the chosen spec file fully. Pay special attention to the **frozen sections** (Intent, Boundaries, I/O & Edge Cases). These are the contract — you cannot drift from them.

Hold internally:
- `spec_path`, `spec_title`, `spec_type` (feature/bugfix/refactor/chore)
- `intent_problem`, `intent_approach`
- `boundaries_always`, `boundaries_ask_first`, `boundaries_never`
- `io_table` (happy/edge/error scenarios)
- `code_map` (files to touch)
- `tasks` (the ordered task list with file paths)
- `acceptance_criteria` (Given/When/Then list)
- `verification_commands` (test, lint, build, etc.)

## 3. Git Sanity Check

Run silently:

```bash
git status --porcelain
git rev-parse --abbrev-ref HEAD
git rev-parse HEAD
```

- If working tree is **dirty**, surface it: "You have uncommitted changes on `{current_branch}`. Stash, commit, or discard them before we start?"
- If on the wrong base branch, surface it: "Currently on `{current_branch}`. Should we branch from here, or switch to `main` first?"
- Otherwise capture `{baseline_commit}` = `git rev-parse HEAD` and continue

## 4. Determine Branch Name

From `spec_type` and `spec_title`, derive a kebab-case branch name with the right prefix:

| Type | Prefix |
|------|--------|
| feature | `feature/` |
| bugfix | `fix/` |
| refactor | `refactor/` |
| chore | `chore/` |
| docs | `docs/` |
| perf | `perf/` |
| hotfix | `hotfix/` |

If the user has a ticket convention (look for it in project-context or recent branches), include it: `feature/ABC-123-user-auth`.

## 5. Confirm Spec + Branch (User Interaction #1)

Present everything in **one prompt**:

```
Ready to implement:

**Spec**: {title}
**Type**: {type}
**Tasks**: {n_total}
**Files**: {file_count} (from Code Map)
**Branch to create**: `{branch_name}`
**Base**: {current_branch} @ {baseline_commit_short}
**Verification**: {test_command}

[Y] Go  [B] Change branch name  [S] Pick a different spec  [C] Cancel
```

Handle:

- **[Y]** → continue to section 6
- **[B]** → ask for new branch name, re-present
- **[S]** → return to section 1
- **[C]** → exit cleanly, no changes made

## 6. Create Branch & Update Spec

Silently:

```bash
git checkout -b {branch_name}
```

Update the spec frontmatter:
- `status: in-progress`
- `branch: {branch_name}`
- `baseline_commit: {baseline_commit}`

Save the spec.

### Update linked PRD spec (if any)

If `prd_ref` is set on the spec (the spec was created from a PRD spec), update the PRD file:

1. Read the PRD at `prd_ref` (path before the `#`)
2. Find the spec by ID (after the `#`, e.g. `S1.1`)
3. Change the spec's `Status` column from `in spec` to `in dev`
4. If this is the first spec moving to `in dev` from this PRD, also update the PRD's `status` from `approved` to `in-progress`
5. Save the PRD

## 7. Transition (silent — no user halt)

Move directly to execution. Do **not** announce "starting implementation" — just go.

→ Read fully and follow [step-02-execute.md](step-02-execute.md).
