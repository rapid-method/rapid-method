---
title: '{title}'
created: '{date}'
status: 'draft | approved | in-progress | done'
feature: '{feature_slug}'
brief_ref: ''
owner: '{owner}'
stepsCompleted: []
---

# PRD: {title}

## Executive Summary

{2-4 sentences capturing: what this product/feature is, who it serves, the core problem it solves, and the differentiator. This is the elevator pitch. Anyone reading just this paragraph should "get it".}

---

## Success Criteria

Measurable outcomes that prove this PRD's scope succeeded. Each must be **SMART**: Specific, Measurable, Attainable, Relevant, Traceable.

| # | Metric | Target | Measurement Method | Traces to |
|---|--------|--------|---------------------|-----------|
| SC1 | {what we measure} | {specific number/threshold} | {how + tool} | {brief section / user need} |

**Examples**:
- ✅ "70% of new users complete onboarding within 5 minutes (measured via product analytics, traces to brief persona Maria's aha moment)"
- ❌ "Users have a good experience" (not measurable, not specific)

---

## Product Scope

Phased delivery — what ships when, and what's deferred.

### MVP (v1)
What ships first to validate the core hypothesis. Minimum viable, not minimum acceptable.
- {capability or scope item}

### Growth (v1.1 → v2)
What gets added once MVP validates the core loop.
- {capability or scope item}

### Vision (v2+)
Long-term direction. Not a commitment — just shape.
- {capability or scope item}

### Out of Scope
Capabilities explicitly NOT in this PRD, with rationale.
- {capability} — {one-line rationale}

---

## User Journeys

The end-to-end paths users take through this product. Cover at least the primary persona.

### Primary Journey: {Persona Name}

| Stage | What Happens | Success Signal |
|-------|--------------|----------------|
| Discovery | {how they find the product} | {observable signal} |
| Onboarding | {first 5 minutes} | {observable signal} |
| Core Usage | {day-to-day} | {observable signal} |
| Aha Moment | {when value clicks} | {observable signal} |
| Long-term | {how it becomes habit} | {observable signal} |

### Secondary Journey: {Persona Name}
{If applicable, otherwise N/A}

---

## Functional Requirements

The **capability contract** for the product. Each FR is a testable capability, implementation-agnostic, and groups stories that become individual specs.

> **Critical**: Anything not listed here will not be built. UX, architecture, and dev only support what's in this section.

### FR Quality Bar

Every FR must:
- ✅ State **WHAT** capability exists, not **HOW** it's implemented
- ✅ Use the format `[Actor] can [capability]`
- ✅ Be testable — someone can verify whether it exists
- ❌ NO subjective adjectives ("easy", "intuitive", "fast", "user-friendly") — use NFRs for quality
- ❌ NO implementation leakage (technology names, libraries, specific UIs)
- ❌ NO vague quantifiers ("multiple", "several", "various") — use specific numbers

Aim for **5-8 capability areas**, **15-30 FRs total** for a typical feature/product. Each FR has 1-3 user stories beneath it.

---

### Capability Area: {Area Name}

> {1-line description of this capability area's role}

#### FR1: {Actor} can {capability}

**Stories** (each becomes a tech spec):

| ID | As a... | I want to... | So that... | Priority | Status |
|----|---------|--------------|------------|----------|--------|
| S1.1 | {persona} | {action} | {benefit} | must / should / could | not started |
| S1.2 | {persona} | {action} | {benefit} | must | not started |

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

---

## Non-Functional Requirements

Quality attributes the system must satisfy. Each NFR must be **measurable** with a specific method.

**Format**: `The system shall [metric] [condition] as measured by [method]`

| # | Category | Requirement | Measurement |
|---|----------|-------------|-------------|
| NFR1 | Performance | API responds within 200ms at p95 under normal load | APM monitoring (e.g. Datadog, NewRelic) |
| NFR2 | Availability | 99.9% uptime during business hours | Cloud provider SLA / status page |
| NFR3 | Security | All PII encrypted at rest using AES-256 | Security audit + database inspection |
| NFR4 | Accessibility | Meets WCAG 2.1 AA | Automated a11y scan + manual audit |
| NFR5 | Scalability | Handles 10,000 concurrent users | Load test results |

### Categories to consider
Performance · Availability · Scalability · Security · Privacy · Accessibility · Maintainability · Observability · Localization · Compliance

Skip categories that don't apply. Don't pad with "the system shall be reliable" — make every entry measurable or delete it.

---

## Domain Requirements

(Include only if the project domain has mandatory compliance. Otherwise delete this section.)

| # | Standard | Requirement | Notes |
|---|----------|-------------|-------|
| DR1 | {HIPAA / PCI-DSS / WCAG / SOC2 / etc.} | {what must be true} | {how it's enforced} |

**Common domain triggers**:
- **Healthcare** → HIPAA (PHI encryption, audit logging, MFA)
- **Fintech** → PCI-DSS, AML/KYC, SOX (financial audit trails)
- **GovTech** → FedRAMP, Section 508 / WCAG 2.1 AA, data residency
- **E-Commerce** → PCI-DSS for payments, tax calculation by jurisdiction
- **EU users** → GDPR (data subject rights, right to erasure)

---

## Open Questions

Unresolved decisions that need to be answered before or during implementation.

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | {question} | {owner} | open |

---

## Status Tracking (auto-maintained)

The PRD's `status` field reflects implementation progress across its stories:

| Status | Meaning |
|--------|---------|
| `draft` | Work in progress (resumable via `stepsCompleted`) |
| `approved` | Ready — `rapid create-spec` will offer its stories |
| `in-progress` | At least one story has been picked up and is being implemented |
| `done` | All `must` stories are implemented |

Story `Status` column values: `not started` → `in spec` (a tech spec exists) → `in dev` (dev workflow running) → `done`.
