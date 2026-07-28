# RAPID Commands

Reference for all RAPID commands. Use `rapid help` inside your AI IDE for a quick summary.

---

## Initiation Commands

These commands set up project knowledge. Run them once when starting with RAPID.

**Recommended order:** `create-brief` → `create-architecture` → `create-patterns`

---

### `rapid create-brief`

Create a Product Brief — the project-level requirements document.

**When to use:**
- Starting a new project from scratch
- Defining the vision and scope of an existing project

**What happens:**
1. **Interactive Discovery** — guided conversation through Vision, Core Features, Success Metrics, Constraints, and Acceptance Criteria
2. **Generate Brief** — fills the template with your answers
3. **Review** — you approve, edit, or cancel

**Sections covered:**

| Section | Required | Description |
|---------|----------|-------------|
| Vision | Yes | Problem, solution, target users |
| Core Features | Yes | Must / Should / Could have |
| Success Metrics | Recommended | How to measure success |
| Constraints | Recommended | Technical and business constraints |
| Acceptance Criteria | Yes | Given/When/Then scenarios |

**Output:** `_rapid-output/brief.md`

**Next:** `rapid create-architecture`

---

### `rapid create-architecture`

Document your project's architecture for AI-assisted development.

**When to use:**
- After creating a product brief
- When the AI needs to understand your project structure

**What happens:**
1. **Auto-Detect** — scans `package.json`, `requirements.txt`, `go.mod`, etc. to detect tech stack, directory structure, architecture pattern, dependencies, and test setup
2. **Interactive Enhancement** — presents findings and asks about modules, integrations, domain terminology, and deployment
3. **Generate** — creates the architecture doc

**Modes:**

| Mode | Flag | Description |
|------|------|-------------|
| Create | (default) | Full interactive setup |
| Update | `--update` | Re-analyze and highlight changes |
| Auto | `--auto` | Minimal interaction, auto-detected info only |

**Output:** `_rapid-output/architecture.md`

**Next:** `rapid create-patterns`

---

### `rapid create-patterns`

Capture coding conventions and standards from your project.

**When to use:**
- After documenting architecture
- When you want the AI to follow your code style consistently

**What happens:**
1. **Analyze Code** — scans for indentation, quotes, semicolons, naming conventions, architecture patterns, state management, etc.
2. **Validate** — presents detected patterns and asks if they're intentional, if anything is missing, and what anti-patterns to avoid
3. **Generate** — creates the patterns doc

**Sections covered:**
- Code Style (formatting, tools)
- Naming (files, variables, functions, classes)
- Architecture (folder structure, component patterns)
- Error Handling
- Testing (structure, naming)
- Git (branches, commits)

**Output:** `_rapid-output/patterns.md`

**Next:** Start developing with `rapid create-prd` or `rapid create-spec`

---

## Plan Commands

These commands help define features before implementation. Use them when you need discovery before jumping into a spec.

---

### `rapid create-prd`

Create a Product Requirements Document for a feature. Helps users who don't have a clear picture of what they want to build — guiding from vague idea to concrete requirements.

PRDs track features across multiple specs. Each user story can become a separate spec, allowing incremental delivery while keeping the big picture visible.

**When to use:**
- You have a vague idea but aren't sure about scope or details
- You want to track feature requirements across multiple specs
- The feature needs discovery before implementation planning

**When to skip:**
- You already know exactly what you want
- The change is small and well-defined (use `create-spec` or `oneshot` directly)

**What happens:**
1. **Load Context** — reads project brief and architecture for background
2. **Feature Discovery** — guided conversation:
   - **Goal** — what problem does this feature solve?
   - **User Stories** — "As a [user], I want to [action], so that [benefit]"
   - **Scope** — what's in and what's explicitly out
   - **Expected Behavior** — happy path, edge cases, errors
   - **Acceptance Criteria** — Given/When/Then scenarios
3. **Generate PRD** — fills the template
4. **Review** — you approve, edit, or cancel

**PRD lifecycle:**

| Status | Meaning |
|--------|---------|
| `draft` | Work in progress |
| `approved` | Ready — `create-spec` will offer its stories |
| `in-progress` | At least one spec is being developed |
| `done` | All stories implemented |

**Output:** `_rapid-output/prds/prd-{date}-{slug}.md`

**Next:** `rapid create-spec` will auto-detect this PRD and offer its stories

---

## Development Commands

These commands are used repeatedly for each task.

**Full flow:** `create-spec` → `dev` (spec auto-detects pending PRDs)
**Fast path:** `oneshot`

---

### `rapid create-spec`

Create a technical specification — the contract between intent and implementation.

**When to use:**
- Before implementing any non-trivial feature
- After creating a PRD to implement one of its stories

**What happens:**
1. **Check WIP** — looks for existing draft specs. If found: continue, archive, or delete
2. **Check PRDs** — looks for PRDs with status `approved` or `in-progress`. If found, offers their stories to implement. User can pick a story or start something separate
3. **Capture Intent** — understand what you want to build (skipped if picked from PRD)
4. **Quick Scan** — silently investigates codebase, reads architecture and patterns
5. **Ask Informed Questions** — 2-5 targeted questions based on what was found (not generic)
6. **Generate Spec** — fills all sections of the template
7. **Present for Approval** — you approve, edit, or cancel

**Spec sections:**

| Section | Frozen after approval? | Description |
|---------|----------------------|-------------|
| Intent | Yes | Problem + Approach |
| Boundaries | Yes | Always / Ask First / Never |
| I/O & Edge Cases | Yes | Scenarios table |
| Code Map | No | Files and their roles |
| Tasks | No | Ordered steps with file paths |
| Acceptance Criteria | No | Given/When/Then |
| Verification | No | Test, build, lint commands |

**Frozen sections** lock after approval to prevent scope creep during implementation.

**Complexity guidance:**

| Tasks | Files | Guidance |
|-------|-------|----------|
| 1-3 | 1-3 | Optimal |
| 4-6 | 4-8 | Acceptable |
| 7+ | 9+ | Consider splitting |

**Output:** `_rapid-output/specs/spec-{timestamp}-{slug}.md` with status `ready-for-dev`

**Next:** `rapid dev`

---

### `rapid dev`

Implement an approved spec. Three sequential steps with human approval gates.

**When to use:**
- After a spec is approved (status `ready-for-dev`)

**Prerequisite:** An approved spec must exist.

#### Step 1 — Branch

- Loads the approved spec
- Creates a semantic branch based on spec type:

| Type | Prefix | Example |
|------|--------|---------|
| Feature | `feature/` | `feature/user-auth` |
| Bug fix | `fix/` | `fix/login-error` |
| Refactor | `refactor/` | `refactor/db-layer` |
| Chore | `chore/` | `chore/deps-update` |
| Docs | `docs/` | `docs/api-reference` |
| Performance | `perf/` | `perf/query-optimize` |
| Hotfix | `hotfix/` | `hotfix/critical-bug` |

- You confirm or rename the branch
- Spec status changes to `in-progress`

#### Step 2 — Implement + AI Code Review

- Captures baseline commit
- Executes each task from the spec, following frozen sections and project patterns
- Runs tests, build, and lint
- **AI self-review** checks the diff against:
  - Spec intent and acceptance criteria
  - Project patterns
  - Boundaries and edge cases
- **Classifies findings:**

| Type | Severity | Action |
|------|----------|--------|
| `intent_gap` | Critical | **HALT** — asks you to decide |
| `missing_ac` | High | Must fix before proceeding |
| `pattern_violation` | Medium | Should fix |
| `code_smell` | Low | Auto-fix if trivial |
| `suggestion` | Info | Note for you |

- Auto-fixes trivial issues (typos, formatting, unused imports)

#### Step 3 — Human Review + Commit

- Generates diff from baseline
- Presents suggested review order (entry points first, tests last)
- Shows AI review findings (if any)
- **You choose:**
  - `[C] Commit` — stages and commits with spec reference
  - `[R] Review` — shows full diff, then re-presents options
  - `[X] Discard` — resets to baseline, spec goes back to `ready-for-dev`
- Spec status changes to `done`

**Output:** Code committed on feature branch, ready for PR

---

### `rapid oneshot`

Fast path for simple, isolated changes. Skips the spec process entirely.

**When to use — ALL must be true:**
- No architectural decisions involved
- No shared state modified
- Clear, isolated change
- Crystal clear intent

**What happens:**
1. **Capture & Scan** — get request and scan affected files
2. **Complexity Check** — scores the change:

| Signal | Weight |
|--------|--------|
| Multiple components | +2 |
| Shared state | +2 |
| New patterns needed | +2 |
| Cross-layer changes | +2 |
| Uncertainty | +1 |
| Multiple files | +1 |
| Single file | -2 |
| Isolated function | -2 |
| Clear pattern exists | -1 |
| User said "simple" | -1 |

3. **Decision:**
   - **Score ≤ 0** — proceed
   - **Score 1-2** — warn, let you choose
   - **Score ≥ 3** — escalate to `rapid create-spec`
4. **Execute** — create branch, implement, verify
5. **Quick Review** — self-check the diff
6. **Present** — you commit, review diff, or discard

**Auto-escalation triggers** (always exits to `create-spec`):
- "Architecture" or "design decision" mentioned
- Change affects more than 3 files
- New external dependency needed
- Breaking change to existing API
- User is uncertain

**Output:** Change committed on semantic branch, ready for PR

---

### `rapid help`

Show a quick reference of all commands, the workflow structure, and guidance on what to do next.

**When to use:**
- First time using RAPID
- Not sure which command to run
- Need a quick refresher

**Output:** Interactive help with commands table, getting started guide, and development workflow diagram.
