# Step 3: Generate the Full PRD (Silent)

**Goal**: Generate the complete PRD from the captured intent + discovery answers + brief context. **No user interaction in this step.** Create the PRD file, fill every section, run a silent self-check enforcing the information density and SMART standards, then move to review.

**Previous step**: [step-02-discover.md](step-02-discover.md)
**Next step**: [step-04-review.md](step-04-review.md)

---

## 1. Determine Slug & Path

From the captured PRD title, derive:
- `slug` — lowercase, hyphens, descriptive but short
- `feature_slug` — same format, used in frontmatter
- `brief_ref` — relative path to the linked brief if any, else empty
- File path: `_rapid/output/prds/prd-{date}-{slug}.md`

## 2. Create the PRD File

Copy `_rapid/templates/prd-template.md` to the path above. Fill the frontmatter:

```yaml
---
title: '{title}'
created: '{date}'
status: 'draft'
feature: '{feature_slug}'
brief_ref: '{brief_path or empty}'
owner: '{user_name from config}'
stepsCompleted: [1, 2, 3]
---
```

## 3. Generate Every Section

Fill the PRD sections directly from discovery + brief. Generation is heads-down writing — questions belonged in step-02, so you shouldn't need to ask here. But if a genuinely blocking ambiguity slipped through, **ask rather than fantasize**; mark smaller uncertainties `[needs validation]`.

> **Information density rule**: Every sentence carries weight. Eliminate filler, hedging, and conversational padding as you write.

### Executive Summary

2-4 sentences. Pull from brief's Executive Summary if available, but adapt to this PRD's specific scope:

```markdown
## Executive Summary

{Product/feature name} is {what} for {who}. It solves {core problem from brief} by {differentiator/approach}. {Optional: 1 sentence on why now or what's at stake.}
```

### Success Criteria (SMART)

Sharpen the brief's success metrics into SMART criteria. Each row must have a specific number, measurement method, and traceability link.

```markdown
## Success Criteria

| # | Metric | Target | Measurement Method | Traces to |
|---|--------|--------|---------------------|-----------|
| SC1 | {behavioral or business outcome} | {specific number/threshold + timeframe} | {tool / how} | {brief section: persona / journey / vision} |
```

If the brief's metrics are vague and the user didn't sharpen them in step-02, still write the best target you can derive — flag it as `[needs validation]`.

### Product Scope (Phased)

Split the brief's must/should/could into MVP / Growth / Vision phases. Keep the brief's Out of Scope intact and add anything that came up in step-02.

```markdown
## Product Scope

### MVP (v1)
- {capability — pulled from brief's must-haves, sized for v1}

### Growth (v1.1 → v2)
- {capability — pulled from brief's should-haves or split-from-must}

### Vision (v2+)
- {capability — pulled from brief's could-haves or future vision}

### Out of Scope
- {capability} — {one-line rationale, often inherited from brief}
```

### User Journeys

Pull from brief's persona journeys. Expand if step-02 surfaced more detail. Each journey row should have a **success signal** (an observable thing that proves the user got value).

```markdown
## User Journeys

### Primary Journey: {Persona Name}

| Stage | What Happens | Success Signal |
|-------|--------------|----------------|
| Discovery | ... | ... |
| Onboarding | ... | ... |
| Core Usage | ... | ... |
| Aha Moment | ... | ... |
| Long-term | ... | ... |

### Secondary Journey: {Persona Name}
{If applicable, otherwise write "N/A — single primary persona for this PRD"}
```

### Functional Requirements

This is the **biggest and most important section**. Generate it with care.

For each capability area captured in step-02:

1. Write a 1-line description of the area's role
2. List FRs (using `[Actor] can [capability]` format)
3. Under each FR, list user stories that implement it

**Sequential numbering**: FR1, FR2, FR3... across the entire PRD (not restarting per area). Stories under FR1 are S1.1, S1.2; under FR2 are S2.1, S2.2; etc.

**FR quality enforcement** (apply as you write):
- ✅ `[Actor] can [capability]` format
- ❌ NO subjective adjectives ("easy", "intuitive", "fast", "user-friendly")
- ❌ NO implementation leakage (no tech names, no specific UIs, no algorithms)
- ❌ NO vague quantifiers ("multiple", "several", "various")

**Story quality enforcement**:
- Format: `As a {real persona name}, I want to {specific action}, so that {concrete benefit}`
- Each story should be implementable as ONE tech spec
- Priority: must / should / could
- Status: starts as `not started`

```markdown
## Functional Requirements

### Capability Area: {Area Name}

> {1-line description of this area's role in the product}

#### FR1: {Actor} can {capability}

**Stories**:

| ID | As a... | I want to... | So that... | Priority | Status |
|----|---------|--------------|------------|----------|--------|
| S1.1 | {persona} | {action} | {benefit} | must | not started |
| S1.2 | {persona} | {action} | {benefit} | should | not started |

#### FR2: {Actor} can {capability}

**Stories**:

| ID | As a... | I want to... | So that... | Priority | Status |
|----|---------|--------------|------------|----------|--------|
| S2.1 | {persona} | {action} | {benefit} | must | not started |

---

### Capability Area: {Another Area}

> {description}

#### FR3: {Actor} can {capability}

**Stories**:

| ID | As a... | I want to... | So that... | Priority | Status |
|----|---------|--------------|------------|----------|--------|
| S3.1 | {persona} | {action} | {benefit} | must | not started |
```

**Coverage targets**:
- 5-8 capability areas for typical product/feature scope
- 15-30 FRs total
- 1-3 stories per FR

### Non-Functional Requirements

Use the values from step-02. If the user gave concrete numbers, lock them in. If they punted on a category, either:
- Skip it (don't pad the table)
- Or write a placeholder marked `[needs validation]`

```markdown
## Non-Functional Requirements

| # | Category | Requirement | Measurement |
|---|----------|-------------|-------------|
| NFR1 | Performance | API responds within {N}ms at p95 under normal load | {tool} |
| NFR2 | Availability | {N}% uptime during {window} | {SLA / status page} |
| NFR3 | Security | {specific requirement} | {audit method} |
| NFR4 | Accessibility | {WCAG level / target} | {scan + manual audit} |
```

**NFR quality enforcement**:
- ✅ Format: `The system shall [metric] [condition] as measured by [method]`
- ❌ "The system shall be scalable" → unmeasurable, reject
- ❌ "Fast response time" → unmeasurable, reject
- Every row must have a specific number AND a measurement method

### Domain Requirements

Only include if the project domain triggers compliance. Otherwise **delete the section entirely** — don't leave an empty table.

Triggers:
- Healthcare → HIPAA
- Fintech → PCI-DSS, AML/KYC
- GovTech → FedRAMP, Section 508 / WCAG
- E-commerce with payments → PCI-DSS
- EU users → GDPR

```markdown
## Domain Requirements

| # | Standard | Requirement | Notes |
|---|----------|-------------|-------|
| DR1 | {standard} | {what must be true} | {how it's enforced} |
```

## 4. Save the PRD File

Write everything to the file. Verify `stepsCompleted: [1, 2, 3]` is set in frontmatter.

## 5. Silent Self-Check (Information Density + SMART + Coverage)

Run through this checklist internally. Apply non-controversial fixes directly. For substantive issues, hold them as Review Notes for step-04.

### Information density (anti-pattern check)
- [ ] No subjective adjectives in any FR ("easy", "intuitive", "fast", "user-friendly", "responsive")
- [ ] No implementation leakage in any FR (no tech names, no library names, no specific UI elements)
- [ ] No vague quantifiers anywhere ("multiple", "several", "various", "many")
- [ ] No filler phrases ("the system will allow users to..." → "users can...")
- [ ] Every sentence carries weight — no padding

If you find violations, **fix them directly** (rewrite the offending FR/sentence). Don't pass them to the user.

### SMART check (FRs + NFRs + Success Criteria)
- [ ] Every FR uses `[Actor] can [capability]` format
- [ ] Every FR is testable (can verify whether the capability exists)
- [ ] Every NFR has a specific number AND a measurement method
- [ ] Every Success Criterion has a target, method, and traceability link

### Coverage check
- [ ] Every brief must-have appears as an FR (or is intentionally cut to Growth/Vision)
- [ ] Every FR has at least one user story
- [ ] Every must-have story exists in the MVP scope (not deferred)
- [ ] Out of Scope is non-empty
- [ ] At least one NFR per category that applies

### Traceability check
- [ ] Each Success Criterion traces to a brief section or user need
- [ ] Each FR traces (mentally) to a journey or success criterion
- [ ] Each story traces to its parent FR (via S{N}.{M} numbering)
- [ ] Personas used in stories actually exist in the brief / journeys

### Consistency with brief
- [ ] In Scope (MVP) doesn't contradict the brief's Out of Scope
- [ ] Personas match the brief's primary/secondary
- [ ] Success metrics align with the brief's success metrics

### Self-Contained
- [ ] A reader who hasn't seen the conversation can understand the PRD
- [ ] No "as discussed" or "see our chat" references
- [ ] The Executive Summary stands alone

Hold any unresolved issues in a `review_notes` list to surface in step-04.

## 6. Transition (silent — no user halt)

Move directly to review. Do **not** show the PRD yet — that happens in step-04.

→ Read fully and follow [step-04-review.md](step-04-review.md).
