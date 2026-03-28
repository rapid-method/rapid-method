# RAPID Create PRD

Create a Product Requirements Document.

## Trigger
- User says "rapid create-prd" or "create prd"
- Starting a new project or major feature

## Workflow

### 1. Load Config
- Load `_rapid/config.yaml`
- Communicate in `{communication_language}`

### 2. Gather Information

Interactive discovery:

```
Let's create your PRD.

1. OVERVIEW
   - What problem are we solving?
   - Who has this problem?
   - What's the high-level solution?
```

Continue through:
- Target users
- Functional requirements (must/should/could)
- Non-functional requirements
- Constraints and assumptions
- Success metrics
- Acceptance criteria

### 3. Create PRD

Use: `_rapid/templates/prd-template.md`
Save: `_rapid/output/prd/prd-{slug}-{date}.md`

### 4. Review

```markdown
## PRD Draft

**Title**: {title}
**Requirements**: {count} functional, {count} non-functional

### Key Requirements
- FR-001: {requirement}
- FR-002: {requirement}

---
[A] Approve  [E] Edit  [R] Refine
```

### 5. Finalize

On approval:
- Set status: `approved`
- Save final version

## Output

```
PRD created!

File: {path}
Status: Approved

Next:
- rapid create-context
- rapid quick-dev
```
