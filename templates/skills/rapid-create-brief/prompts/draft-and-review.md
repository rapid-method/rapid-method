# Stage 3: Draft & Review

Generate the product brief from discovery, present it, and iterate with the user.

## Step 1: Draft the Brief

Use template: `_rapid/templates/product-brief-template.md`

**Writing principles**:
- Lead with the problem, not the solution
- Be concrete, not abstract — "reduces onboarding from 3 days to 30 minutes" beats "improves onboarding"
- Confident voice — this is a decision document, not a proposal
- Keep it to 1-2 pages — overflow detail goes in the document's Open Questions or is addressed in the PRD later

**Frontmatter**:
```yaml
---
title: '{title}'
created: '{date}'
status: 'draft'
version: '1.0'
owner: '{owner}'
---
```

Save to: `_rapid/output/briefs/brief-{slug}-{date}.md`

## Step 2: Self-Review

Before presenting to the user, review the draft through two lenses:

### Lens 1: Gaps & Risks
- What's missing or thin?
- What assumptions are untested?
- Are differentiators defensible?
- Is the scope realistic for v1?

### Lens 2: Opportunities
- Any adjacent value we're leaving on the table?
- Are success metrics ambitious enough?
- Is the positioning clear?

If the review surfaces non-controversial improvements, apply them directly.
If it surfaces substantive questions, note them to ask the user.

## Step 3: Present to User

Show a summary first, then the full brief:

```
## Product Brief Ready

**Title**: {title}
**Users**: {user_types}
**Features**: {must_count} must / {should_count} should / {could_count} could
**ACs**: {ac_count}

{If review surfaced questions}:
### Review Notes
I noticed a few things while drafting:
- {substantive question or suggestion}

### Full Brief
{complete brief content}

---
[A] Approve  [E] Edit section  [C] Cancel
```

## Step 4: Iterate

- **[A] Approve**: Set status to `approved`, save final version
- **[E] Edit**: Ask which section to refine. Apply changes, re-present
- **[C] Cancel**: Confirm cancellation, do not save

The user can go through as many edit cycles as needed. Each time, re-present the summary with changes highlighted.

## Step 5: Finalize

On approval:
1. Update frontmatter status to `approved`
2. Save final version
3. Present completion:

```
## Brief Approved ✓

**File**: _rapid/output/briefs/brief-{slug}-{date}.md

### Recommended Next Steps
- `rapid create-architecture` — Document/plan project architecture
- `rapid create-patterns` — Capture/set coding patterns
- `rapid create-prd` — Create PRD for a specific feature
```
