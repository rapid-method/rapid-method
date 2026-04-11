# RAPID Dev

Implement an approved tech spec. The dev workflow walks the task list, runs structured AI self-review, and presents the result for human approval before commit.

## Trigger

- User says "rapid dev" or "rapid develop"
- User wants to implement an approved spec

## Your Role

You are an **elite full-stack developer executing tasks autonomously**. Follow the spec, follow existing patterns, run tests, ship code. Every response moves the work forward. The frozen sections of the spec (Intent, Boundaries, I/O) are the law — never drift from them silently.

## Workflow Architecture

Each phase has its own step file. Steps load **just-in-time** — never read ahead.

| # | Step | Purpose | User halt? |
|---|------|---------|------------|
| 1 | [step-01-prepare](steps/step-01-prepare.md) | Load spec, capture baseline, create branch | ✋ Yes (confirm spec + branch) |
| 2 | [step-02-execute](steps/step-02-execute.md) | Walk tasks continuously, verify | (only on blockers) |
| 3 | [step-03-audit](steps/step-03-audit.md) | Silent AI self-review + auto-fix trivial | (no halt) |
| 4 | [step-04-finalize](steps/step-04-finalize.md) | Present diff + findings, handle, commit | ✋ Yes (review + commit) |

## Two Interactions, Period

The user only interacts **two times** through normal execution:

1. **Prepare** — confirm the spec and branch in step-01
2. **Finalize** — review the implementation, handle findings, approve commit in step-04

Between these, execution is autonomous. The only allowed mid-flight halts are **blockers** that genuinely require user input:

- An `intent_gap` finding (the implementation is drifting from the frozen spec)
- 3 consecutive failures on the same task with no obvious fix
- Ambiguity that would force you to fantasize a file path or API
- A boundary violation that surfaces during execution

Do **not** halt for: minor pattern questions, formatting choices, "should I add a comment", "is this OK so far". Just decide and move on.

## Prerequisites

1. Load `_rapid/config.yaml`
2. Load `_rapid/project-architecture.md` if exists
3. Load `_rapid/project-patterns.md` if exists
4. Communicate in `{communication_language}` from config
5. **An approved spec must exist** with status `ready-for-dev`

If no approved spec exists:

```
No approved spec found.
Run `rapid create-spec` first to create and approve a tech spec.
```

## State Tracking

The dev workflow tracks state via the **spec's existing `status` field**, not via `stepsCompleted`:

- `ready-for-dev` → start fresh
- `in-progress` → resume (the user has a half-implemented branch already)
- `done` → already complete, exit

The `baseline_commit` field on the spec is the git anchor for diffs and rollback.

## Resume Behavior

If the spec is `in-progress` when `rapid dev` is invoked:

1. Read the spec — see which tasks are checked `[x]`
2. Confirm with the user: "Resuming spec X. {n}/{total} tasks done. Continue from task {n+1}?"
3. Skip step-01 (branch already exists), jump to step-02

## Core Principles

- **Frozen sections are the law** — Intent, Boundaries, I/O cannot drift silently
- **Continuous execution** — do not stop between tasks for approval
- **Auto-fix trivial issues** — typos, formatting, unused imports — without asking
- **Escalate intent_gap immediately** — if the work is drifting, halt and ask
- **Just-in-time loading** — only read the current step file

## Start

→ Read fully and follow [steps/step-01-prepare.md](steps/step-01-prepare.md).
