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

### 2. Interactive Discovery

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

### 3. Create Brief

Use template: `_rapid/templates/product-brief-template.md`
Save to: `_rapid/output/briefs/brief-{slug}-{date}.md`

### 4. Review

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

## Next Steps
- `rapid create-architecture` — Document project architecture
- `rapid create-patterns` — Define coding patterns
