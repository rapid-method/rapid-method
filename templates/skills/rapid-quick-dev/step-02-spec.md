# Step 2: Create Spec

## Objective
Investigate codebase and create tech specification.

## Actions

### 2.1 Investigate
- Search for relevant files
- Read code to be modified
- Understand patterns and structure
- Identify dependencies

### 2.2 Create Spec

Use template: `_rapid/templates/tech-spec-template.md`
Save to: `_rapid/output/specs/spec-{timestamp}-{slug}.md`

Fill sections:
| Section | Content |
|---------|---------|
| Intent | Problem + Approach (1-2 sentences each) |
| Boundaries | Always/Ask First/Never |
| I/O & Edge Cases | Scenarios table |
| Code Map | Files and roles |
| Tasks | Ordered with file paths |
| Acceptance | Given/When/Then |
| Verification | Commands to run |

### 2.3 Self-Review

Verify **Ready for Development**:
- [ ] **Actionable**: Tasks have file paths
- [ ] **Logical**: Tasks ordered by dependency
- [ ] **Testable**: ACs use Given/When/Then
- [ ] **Complete**: No TBDs or placeholders

### 2.4 Token Check
- **900-1600**: Optimal
- **>1600**: Consider splitting

### 2.5 User Approval

```markdown
## Tech Spec Ready

**Title**: {title}
**Type**: {type}
**Branch**: {branch}
**Files**: {count}

### Intent
{problem} → {approach}

### Tasks
1. {task_1}
2. {task_2}

---
[A] Approve  [E] Edit  [C] Cancel
```

- `[A]`: Set status `ready-for-dev` → Step 3
- `[E]`: Apply changes, re-present
- `[C]`: Abort

## Output
- Spec file created
- Status: `ready-for-dev`
- User approved
