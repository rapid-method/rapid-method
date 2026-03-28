# RAPID Workflow

The RAPID workflow transforms a task description into reviewed, committed code through a structured pipeline. Every step has a clear purpose, defined inputs/outputs, and human approval gates where it matters.

## Flow Overview

```
                         rapid quick-dev "task"
                                │
                    ┌───────────▼───────────┐
                    │   Step 1: CLARIFY     │
                    │   Understand intent   │
                    │   Create branch       │
                    └───────────┬───────────┘
                                │
                        ┌───────▼───────┐
                        │ Scope Check   │
                        └───┬───────┬───┘
                            │       │
                   Complex  │       │  Simple
                   change   │       │  (zero blast radius)
                            │       │
              ┌─────────────▼─┐   ┌─▼──────────────────┐
              │  Step 2: SPEC │   │  ONE-SHOT           │
              │  Write spec   │   │  Confirm → Implement│
              │  Get approval │   │  → Verify → Commit  │
              └──────┬────────┘   └─────────┬───────────┘
                     │                      │
            ┌────────▼────────┐             │
            │ User Approval   │             │
            │ [A]pprove       │             │
            │ [E]dit          │             │
            │ [C]ancel        │             │
            └────────┬────────┘             │
                     │ Approved             │
           ┌─────────▼──────────┐           │
           │  Step 3: IMPLEMENT │           │
           │  Execute tasks     │           │
           │  Run tests/build   │           │
           └─────────┬──────────┘           │
                     │                      │
           ┌─────────▼──────────┐           │
           │  Step 4: REVIEW    │           │
           │  Self-review       │           │
           │  Classify findings │           │
           │  Present results   │           │
           └─────────┬──────────┘           │
                     │                      │
                     ▼                      ▼
              ┌──────────────────────────────┐
              │  User Decision               │
              │  [C]ommit  [P]R  [R]eview    │
              │  [X] Discard                 │
              └──────────────────────────────┘
```

> Visual diagram also available: [workflow.excalidraw](workflow.excalidraw)

---

## Step 1: Clarify & Branch

**Purpose**: Understand exactly what the user wants and create an isolated workspace.

**Why this step exists**: AI hallucinates when intent is ambiguous. This step forces clarity before any code is touched, preventing wasted work on the wrong problem.

### What happens

1. **Load Context** — Reads `config.yaml`, `project-context.md`, and `project-patterns.md` to understand the project
2. **Determine Intent** — Extracts the task from the user's message. If ambiguous, it **stops and asks** rather than guessing
3. **Git Check** — Verifies the working tree is clean and confirms the base branch
4. **Create Branch** — Creates a branch with semantic prefix:

   | Type | Prefix | Example |
   |------|--------|---------|
   | Feature | `feature/` | `feature/user-authentication` |
   | Bug fix | `fix/` | `fix/login-redirect` |
   | Refactor | `refactor/` | `refactor/api-client` |
   | Chore | `chore/` | `chore/update-deps` |
   | Docs | `docs/` | `docs/api-reference` |
   | Performance | `perf/` | `perf/query-optimization` |
   | Hotfix | `hotfix/` | `hotfix/null-pointer` |

5. **Scope Check** — If the task has multiple goals, asks the user to split or confirm
6. **Route** — Decides between full spec path or one-shot fast path

### Routing decision

The routing is based on **blast radius**. All of these must be true for the one-shot path:

- No architectural decisions required
- No shared state modified
- Clear, isolated change
- Crystal clear intent

If any condition fails → full spec path.

### Output
- Clear task description (intent)
- Created branch
- Chosen path: `spec` or `oneshot`

---

## Step 2: Create Spec

**Purpose**: Investigate the codebase and write a technical specification before touching any code.

**Why this step exists**: Writing code without a plan leads to scope creep, missed edge cases, and rework. The spec forces the AI to think before acting — and gives you a chance to course-correct before implementation begins.

### What happens

1. **Investigate** — Searches and reads relevant files, understands patterns, identifies dependencies
2. **Write Spec** — Fills the tech spec template with:

   | Section | What it covers | Frozen? |
   |---------|---------------|---------|
   | **Intent** | Problem statement + approach (1-2 sentences each) | Yes |
   | **Boundaries** | Always do / Ask first / Never do | Yes |
   | **I/O & Edge Cases** | Input/output scenarios table | Yes |
   | **Code Map** | Files and their roles | No |
   | **Tasks** | Ordered implementation steps with file paths | No |
   | **Acceptance Criteria** | Given/When/Then format | No |
   | **Verification** | Commands to run (test, build, lint) | No |

3. **Self-Review** — Checks that the spec is actionable, logical, testable, and complete
4. **Token Check** — Warns if spec exceeds 1600 tokens (optimal: 900–1600)
5. **User Approval** — Presents the spec for approval

### Frozen sections

After the user approves, **Intent**, **Boundaries**, and **I/O** are frozen. The implementation step reads these frozen sections to stay on track. This is RAPID's core mechanism for preventing scope creep.

### Approval gate

```
[A] Approve  →  Lock frozen sections, proceed to implementation
[E] Edit     →  Apply changes, re-present
[C] Cancel   →  Abort the workflow
```

### Output
- Spec file saved to `_rapid/output/specs/`
- Status: `ready-for-dev`
- User has approved the plan

---

## Step 3: Implement

**Purpose**: Execute the approved spec, task by task.

**Why this step exists**: With a reviewed spec in hand, implementation becomes mechanical. The AI follows the plan instead of improvising, producing predictable results.

### What happens

1. **Capture Baseline** — Records the current commit hash for later diff
2. **Execute Tasks** — For each task in the spec:
   - Re-reads frozen sections (Intent, Boundaries) to stay aligned
   - Implements following the task description
   - Follows `project-patterns.md` conventions
   - Marks task as done
3. **Verify** — Runs test, build, and lint commands from config
4. **Self-Check** — Confirms all tasks done, all acceptance criteria met, all checks pass

### Rules

| Do | Don't |
|----|-------|
| Follow existing patterns | Change code outside scope |
| Keep changes minimal | Refactor unrelated code |
| Write clean code | Add unspecified features |
| Respect boundaries | Ignore frozen sections |

### If verification fails

The AI fixes issues and re-verifies. It does not proceed until tests pass, build succeeds, and lint is clean.

### Output
- All tasks implemented
- All acceptance criteria met
- Verification passed (tests, build, lint)

---

## Step 4: Review & Present

**Purpose**: Self-review the implementation against the spec and present results for the user's final decision.

**Why this step exists**: Even with a spec, bugs slip through. The self-review catches deviations from intent, missed edge cases, and pattern violations before the user sees the code.

### What happens

1. **Generate Diff** — Creates a diff from baseline commit to current HEAD
2. **Self-Review** — Checks the diff against:
   - Spec intent — does the code do what was planned?
   - Acceptance criteria — all satisfied?
   - Project patterns — conventions followed?
   - Edge cases — handled?
3. **Classify Findings** — Each issue gets a classification:

   | Classification | Meaning | Action |
   |---------------|---------|--------|
   | `intent_gap` | Code doesn't match spec intent | **HALT** — needs user decision |
   | `bad_spec` | Spec was wrong or incomplete | Note for user |
   | `patch` | Minor fixable issue | Auto-fix immediately |
   | `defer` | Valid issue, not for this PR | Add to backlog |
   | `noise` | False positive | Ignore |

4. **Review Order** — Generates a suggested order to review the changed files (by concern, starting with entry points, ending with tests/config)
5. **Present Results** — Shows summary with file changes, verification status, and options

### User decision

```
[C] Commit     →  Stage all, commit with conventional message
[P] Create PR  →  Commit, push branch, open pull request
[R] Review     →  Walk through the diff in suggested order
[X] Discard    →  Revert all changes (with confirmation)
```

### Output
- Spec status set to `done`
- Code committed or PR created (user's choice)

---

## One-Shot Fast Path

**Purpose**: Skip the spec for trivial, isolated changes.

**Why this exists**: Not every change needs a full spec. Fixing a typo or updating a constant shouldn't require a formal specification. The one-shot path provides speed without abandoning structure entirely.

### Entry criteria

ALL must be true:
- No architectural decisions
- No shared state modified
- Clear, isolated change
- Crystal clear intent

### Flow

```
Confirm scope → Baseline → Implement → Verify → Quick review → Present → Commit
```

1. **Confirm** — Shows the planned change and affected files, asks for confirmation
2. **Baseline** — Records current commit
3. **Implement** — Makes the change, following patterns, keeping it minimal
4. **Verify** — Runs tests and lint
5. **Quick Review** — Checks diff for obvious issues
6. **Present** — Shows result with `[C]ommit` or `[X] Discard`

### Escalation

If the change turns out to be more complex than expected, the one-shot path **escalates** to the full spec path automatically:

```
This is more complex than expected.
Switching to full spec path.
→ step-02-spec.md
```

---

## Key Principles

### Spec-first, not code-first
The spec exists so you can review the plan before the code exists. Changing a plan is free. Changing code is not.

### Frozen intent
Once you approve a spec, its Intent, Boundaries, and I/O sections are frozen. The implementation reads these sections on every task to prevent drift. This is how RAPID prevents the AI from "improving" things you didn't ask for.

### Human gates
You approve twice: once for the spec (Step 2), once for the code (Step 4). The AI never commits without your explicit choice.

### Self-review classification
Not all findings are equal. `intent_gap` halts everything. `patch` gets auto-fixed. `noise` gets ignored. This saves you from reviewing a wall of false positives.

### Escalation over failure
If the one-shot path discovers complexity, it escalates to spec rather than producing bad code. If verification fails, the AI fixes and retries rather than skipping checks.
