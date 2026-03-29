# RAPID Create Spec

Create a technical specification for a task. The spec is the contract between intent and implementation.

## Trigger
- User says "rapid create-spec" or "create spec"
- User wants to plan implementation before coding

## Prerequisites
- Load `_rapid/config.yaml`
- Load `_rapid/project-architecture.md` if exists
- Load `_rapid/project-patterns.md` if exists
- Communicate in `{communication_language}`

## Workflow

### 1. Clarify Intent

**Determine what the user wants:**
1. **Explicit**: User provided clear task description
2. **Conversation**: Extract from recent messages
3. **Ask**: If unclear, ask user

**DO NOT FANTASIZE** — If ambiguous, HALT and ask.

**Scope Check:**
- Single focused task? → Continue
- Multiple goals? → Ask to split or keep

### 2. Investigate

- Search for relevant files
- Read code to be modified
- Understand existing patterns and structure
- Identify dependencies
- Check for related specs or briefs

### 3. Write Spec

Use template: `_rapid/templates/tech-spec-template.md`
Save to: `_rapid/output/specs/spec-{timestamp}-{slug}.md`

Fill sections:

| Section | Content | Frozen? |
|---------|---------|---------|
| **Intent** | Problem + Approach (1-2 sentences each) | Yes |
| **Boundaries** | Always / Ask First / Never | Yes |
| **I/O & Edge Cases** | Scenarios table | Yes |
| **Code Map** | Files and roles | No |
| **Tasks** | Ordered with file paths | No |
| **Acceptance Criteria** | Given/When/Then | No |
| **Verification** | Commands to run | No |

### 4. Self-Review

Verify **Ready for Development**:
- [ ] **Actionable**: Tasks have file paths
- [ ] **Logical**: Tasks ordered by dependency
- [ ] **Testable**: ACs use Given/When/Then
- [ ] **Complete**: No TBDs or placeholders

### 5. Token Check
- **900-1600**: Optimal
- **>1600**: Consider splitting

### 6. User Approval

```markdown
## Tech Spec Ready

**Title**: {title}
**Type**: {type}
**Files**: {count}

### Intent
{problem} → {approach}

### Tasks
1. {task_1}
2. {task_2}

---
[A] Approve  [E] Edit  [C] Cancel
```

- `[A]`: Set status `ready-for-dev`, freeze Intent/Boundaries/I/O → done
- `[E]`: Apply changes, re-present
- `[C]`: Abort

## Output
- Spec file saved with status `ready-for-dev`
- Frozen sections locked

## Next Steps
- `rapid dev` — Start development using this spec
