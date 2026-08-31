# Step 2: Execute Tasks (Continuous)

**Goal**: Walk the spec's task list top-to-bottom, implementing each task and verifying as you go. **No user halts** unless you hit a real blocker.

**Previous step**: [step-01-prepare.md](step-01-prepare.md)
**Next step**: [step-03-audit.md](step-03-audit.md)

---

## Critical Rule: Continuous Execution

Do **not** stop between tasks for approval, confirmation, or status updates. Walk the entire list. The user will see everything in step-04.

You may halt **only** under the conditions in section 4.

## 1. Walk the Task List

For each task in the spec, in order:

### a) Re-read the frozen sections (in your head)

Before touching code, re-anchor on Intent + Boundaries + I/O. The frozen sections are the law — never drift from them silently.

### b) Implement

- Read the files named in the task
- Apply the change exactly as the task describes
- Follow patterns from `_rapid-output/patterns.md` and adjacent code
- Keep changes minimal — don't refactor neighbors
- Add comments only where the logic isn't self-evident

### c) Verify the task

After each task:
- Run the **scoped** test command (only the tests for files this task touched, if possible)
- Watch for type errors, import errors, obvious failures
- If something breaks, fix it before moving to the next task

### d) Mark complete

Update the spec file: change the task's checkbox from `[ ]` to `[x]`. Save.

### e) Move to the next task

No pause. No "task 1 complete, proceeding to task 2" message. Just continue.

## 2. After All Tasks Complete

Run the **full** verification suite from the spec's Verification section:

```bash
{test_command}
{lint_command}
{type_check_command}
{build_command}
```

If any command fails, fix it. Re-run. Loop until clean.

If a fix would require modifying files outside the Code Map, **halt** (see section 4 — boundary violation).

## 3. Implementation Discipline

### DO
- Follow patterns observed in the codebase
- Keep changes scoped to files in the Code Map
- Respect the `Always` / `Never` boundaries from the spec
- Fix things you break in the same session

### DO NOT
- Refactor unrelated code
- Add features the spec didn't mention
- Skip tasks because they "feel done"
- Touch files outside the Code Map without halting first
- Modify the frozen sections of the spec

## 4. Allowed Halt Conditions

Halt and ask the user **only** for these:

### a) `intent_gap`
While implementing, you realize the spec's Approach won't actually solve the Problem as described. The frozen Intent is wrong or incomplete.

```
HALT — intent gap detected.

Task {n}: {description}

The spec's approach says "{approach}", but implementing it reveals:
{specific issue}

Options:
[A] Update the spec's Intent and continue
[B] Change my approach within the existing Intent
[C] Stop and revise the spec separately
```

### b) Boundary violation
A task can't be completed without touching a file outside the Code Map, or violating an `Always`/`Never` rule.

```
HALT — boundary tension.

Task {n} requires changes to `{file}` which is not in the Code Map.

Options:
[A] Add `{file}` to scope and continue
[B] Pick a different approach that stays in scope
[C] Stop and revise the spec
```

### c) 3 consecutive failures on the same task
You've tried 3 distinct approaches and the task still doesn't work. Don't loop forever.

```
HALT — stuck on task {n} after 3 attempts.

What I tried:
1. {approach 1} → {how it failed}
2. {approach 2} → {how it failed}
3. {approach 3} → {how it failed}

Need guidance: {specific question}
```

### d) Fantasy risk
You'd have to invent a file path, API, or behavior to continue. The spec is missing something critical.

```
HALT — missing context.

Task {n} references `{thing}` but I can't find it in the codebase.

Need: {specific question}
```

### Do NOT halt for
- "Should I add a comment here?"
- "Is this the right pattern?" (decide based on neighbors)
- "Should I run the tests?" (yes, always, without asking)
- "Is the implementation OK so far?" (let the user see the whole thing in step-04)
- Style choices (follow the codebase)

## 5. Track Implementation Notes

As you go, hold internally:
- `tasks_done`: list of completed task IDs
- `files_modified`: actual files you touched
- `tests_added`: any new test files
- `verification_results`: pass/fail status of each verification command
- `notes`: anything noteworthy that should appear in step-04's review presentation (e.g. "had to switch from approach X to approach Y because of Z")

These will feed into the audit and the final review.

## 6. Transition (silent — no user halt)

When all tasks are `[x]` and verification is clean, move to audit. Do not announce completion to the user.

→ Read fully and follow [step-03-audit.md](step-03-audit.md).
