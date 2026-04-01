# RAPID Create Spec

Create a technical specification for a task. The spec is the contract between intent and implementation.

## Trigger
- User says "rapid create-spec" or "create spec"
- User wants to plan implementation before coding

## Prerequisites
- Load `_rapid/config.yaml`
- Load `_rapid/project-architecture.md` if exists
- Load all rules from `_rapid/rules/*.md` if exists
- Communicate in `{communication_language}`

## Workflow

### 0. Check Work in Progress

**Before anything else, check for existing WIP:**

Look for `_rapid/output/specs/spec-*-wip.md`

**If WIP exists:**
```
Found spec in progress:
**{title}** (created {date})

[C] Continue where you left off
[A] Archive and start fresh
[D] Delete and start fresh
```

- `[C]`: Load WIP, jump to step 4 (present for approval)
- `[A]`: Rename to `spec-{slug}-archived-{date}.md`, continue to step 1
- `[D]`: Delete WIP, continue to step 1

**If no WIP:** Continue to step 1

---

### 1. Capture Intent

**Get the user's request.** They may have already said it, or ask:

"What do you want to build?"

**Extract:**
- What they want (the goal)
- Any constraints mentioned
- Files/areas they referenced

**DO NOT FANTASIZE** — If ambiguous, ask for clarification.

---

### 2. Quick Scan (No Pause)

**Immediately scan the codebase to understand context:**

a) **Check for planning docs:**
- `_rapid/output/briefs/` - related product briefs
- `_rapid/project-architecture.md` - system structure
- `_rapid/rules/` - coding rules and conventions

b) **Search for relevant code:**
- Files/classes/functions mentioned by user
- Related areas that might be affected
- Existing patterns for similar features

c) **Build mental model:**
- What exists today
- What needs to change
- What patterns to follow

**This should take <30 seconds. Just enough to ask smart questions.**

---

### 3. Ask Informed Questions

**Ask 2-5 targeted questions based on what you found:**

Instead of generic questions, ask specific ones:
- "Found `AuthService` uses JWT. Should the new endpoint follow the same auth pattern?"
- "The `UserController` has 15 methods. Should this be a new controller or extend it?"
- "There's already a `validate()` helper. Use it or create specific validation?"

**Adapt to `{user_skill_level}`:**
- Technical users → technical questions
- Non-technical users → plain language

**After answers, confirm understanding:**
```
Got it. To confirm:
- Problem: {1 sentence}
- Approach: {1 sentence}
- Scope: {what's in, what's out}

Correct? (y/n)
```

If no, clarify. If yes, continue.

---

### 4. Generate Spec (No Pause)

**Create the spec file immediately:**

a) **Determine scope:**
- Single focused task? → Continue
- Multiple unrelated goals? → Suggest splitting, ask user

b) **Write spec:**

Use template: `_rapid/templates/tech-spec-template.md`
Save to: `_rapid/output/specs/spec-{timestamp}-{slug}-wip.md`

Fill all sections:

| Section | Content | Notes |
|---------|---------|-------|
| Intent | Problem + Approach | 1-2 sentences each |
| Boundaries | Always / Ask First / Never | Guard rails |
| I/O & Edge Cases | Scenarios table | Happy, edge, error |
| Code Map | Files and roles | From investigation |
| Tasks | Ordered with file paths | Actionable |
| Acceptance Criteria | Given/When/Then | Testable |
| Verification | Commands to run | Test, build, lint |

c) **Self-verify Ready for Development:**
- [ ] **Actionable**: Every task has file path + action
- [ ] **Logical**: Tasks ordered by dependency
- [ ] **Testable**: ACs use Given/When/Then
- [ ] **Complete**: No TBDs or placeholders
- [ ] **Bounded**: Frozen sections are clear

d) **Complexity check:**

| Tasks | Files | Guidance |
|-------|-------|----------|
| 1-3 | 1-3 | Optimal for focused work |
| 4-6 | 4-8 | Acceptable, stay focused |
| 7+ | 9+ | Consider splitting into multiple specs |

**Red flags (suggest splitting):**
- Tasks touch unrelated areas
- Multiple independent features bundled
- Spec requires context-switching between domains

---

### 5. Present for Approval

**Show the complete spec:**

```markdown
## Tech Spec: {title}

### Intent
**Problem:** {problem}
**Approach:** {approach}

### Boundaries
**Always:** {always}
**Ask First:** {ask_first}
**Never:** {never}

### Tasks
1. {task_1}
2. {task_2}
...

### Acceptance Criteria
- Given X, when Y, then Z
...

---
**Stats:** {task_count} tasks | {file_count} files | {ac_count} ACs

[A] Approve  [E] Edit  [C] Cancel
```

**Handle choice:**

- `[A] Approve`:
  - Set status: `ready-for-dev`
  - Rename: `spec-{slug}-wip.md` → `spec-{timestamp}-{slug}.md`
  - Freeze Intent/Boundaries/I/O sections
  - Done. Suggest: "Run `rapid dev` to start implementation"

- `[E] Edit`:
  - Ask what to change
  - Apply changes
  - Re-present (loop back to step 5)

- `[C] Cancel`:
  - Confirm: "Delete the draft? (y/n)"
  - If yes: delete WIP file
  - If no: keep as WIP for later

---

## Flow Summary

```
[Check WIP] → [Capture Intent] → [Quick Scan] → [Ask Questions] → [Generate Spec] → [Approve]
     ↓              ↓                  ↓               ↓                 ↓              ↓
  Continue?      What?             (silent)        2-5 Qs           (silent)        A/E/C
```

Only 3 user interactions: Intent → Questions → Approval

---

## Output
- Spec file saved with status `ready-for-dev`
- Frozen sections locked
- Ready for `rapid dev`
