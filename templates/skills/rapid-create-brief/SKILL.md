# RAPID Create Brief

Create a Product Brief — the single requirements document for your project or feature.

## Trigger
- User says "rapid create-brief" or "create brief"
- User wants to define requirements for a project or feature

## Workflow

### 1. Load Config
- Load `_rapid/config.yaml`
- Communicate in `{communication_language}`
- Output in `{document_language}`

### 2. Detect Context
- Check if this is an existing project or new project
- **Existing project**: Check if `_rapid/project-architecture.md` exists
- **New project**: No architecture file exists

### 3. Interactive Discovery

Guide user through each section:

**VISION** (required):
1. What problem are we solving?
2. Who has this problem?
3. What's the high-level solution?
4. Who are the target users?

**CORE FEATURES** (required):
1. What are the must-have features?
2. What are the should-have features?
3. What are the could-have features?

**SUCCESS METRICS** (recommended):
1. How will we measure success?
2. What are the targets?

**CONSTRAINTS** (recommended):
1. Technical constraints?
2. Business constraints?
3. Assumptions we're making?

**ACCEPTANCE CRITERIA** (required):
1. Define Given/When/Then scenarios for each must-have feature

### 4. New Project: Technical Foundation

**Only for new projects** (no existing architecture):

After the brief, guide user through initial technical decisions:

**TECH STACK**:
1. What programming language(s)?
2. What framework(s)?
3. What database (if any)?
4. What key libraries/dependencies?

**INITIAL ARCHITECTURE**:
1. What's the high-level structure? (monolith, modular, microservices)
2. What are the main components/modules?
3. Any external integrations?

**CODING RULES** (create initial rules in `_rapid/rules/`):
1. Code style preferences? (indentation, quotes, semicolons)
2. Naming conventions? (files, variables, functions)
3. Any specific patterns to follow?
4. Testing approach?
5. Git workflow? (branch naming, commit format)

Generate initial rule files:
- `_rapid/rules/code-style.md`
- `_rapid/rules/naming.md`
- `_rapid/rules/architecture.md`
- `_rapid/rules/git.md`

Generate architecture: `_rapid/project-architecture.md`

### 5. Create Brief

Use template: `_rapid/templates/product-brief-template.md`
Save to: `_rapid/output/briefs/brief-{slug}-{date}.md`

### 6. Review

Present draft:
```
## Product Brief Ready

**Title**: {title}
**Features**: {must_count} must / {should_count} should / {could_count} could
**ACs**: {ac_count}

[A] Approve  [E] Edit  [C] Cancel
```

- `[A]`: Set status `approved`
- `[E]`: Apply changes, re-present
- `[C]`: Abort

## Output
- Brief file created
- Status: `approved`
- For new projects: Architecture and initial rules created

## Next Steps
- **Existing project**: `rapid project-scan` — Scan and document project
- **New project**: `rapid create-spec` — Create spec for first task
- `rapid create-rule` — Add or modify coding rules
