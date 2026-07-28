# Step 2: Discovery — Read Brief, Ask Informed Questions

**Goal**: Read the linked brief silently (if any), then ask **one batch** of 6-10 sharp questions that surface what the PRD needs beyond what the brief already covers. This is **user interaction #2 of 3**.

**Previous step**: [step-01-init.md](step-01-init.md)
**Next step**: [step-03-generate.md](step-03-generate.md)

---

## 1. Read the Brief (Silent)

If `brief_path` was set in step-01, read the brief file in full. Extract everything the PRD will inherit:

- **Vision** — problem, solution, differentiator, why now
- **Personas** — primary and secondary, with their journeys (these become the PRD's User Journeys)
- **Must/should/could features** — these become candidates for FRs
- **Out of scope** — these become PRD's out-of-scope (don't override)
- **Success metrics** — these become candidates for Success Criteria
- **Constraints & assumptions** — feed NFRs and Domain Requirements
- **Future Vision** — feeds the Vision phase of Product Scope

If no brief is linked, build context from `_rapid/project-architecture.md` and `_rapid/project-patterns.md` if they exist. Without a brief, you'll need to ask more discovery questions.

## 2. Build a Mental Model (Silent)

Hold in your head:

### What you already know (from brief)
- Personas, vision, MVP scope, success metrics
- Out-of-scope items (immutable in this PRD)
- Why now / market context

### What the PRD needs to add on top
- **Capability areas (epics)** — how do the brief's must-haves cluster into 5-8 logical groups?
- **Functional Requirements** — for each capability area, what specific capabilities exist?
- **User stories per FR** — implementable units (each becomes a tech spec)
- **NFRs** — performance, availability, security, accessibility, scalability
- **Domain compliance** — does the project domain trigger HIPAA/PCI/WCAG/GDPR/etc.?
- **Phased scope** — MVP / Growth / Vision split (more granular than the brief's MVP)
- **Detailed user journeys** — beyond the brief's high-level journey

### What you're uncertain about
These become your questions.

## 3. Ask Informed Questions (User Interaction #2)

Ask **6-10 sharp questions in one batch**. Make them specific to the brief and the feature, not generic. Each question should resolve a real uncertainty.

### Question categories (pick ~6-10 across these)

**A. Scope confirmation** (always ask)
- "Is this PRD for the whole product from the brief, or just {area X}?"
- "Should the PRD's MVP match the brief's MVP, or is there a tighter v1 cut for this PRD specifically?"

**B. Capability areas / epics** (always ask)
- "Looking at the brief's must-haves, I'd cluster them into these capability areas: {Area 1, Area 2, Area 3}. Does that grouping work, or would you organize them differently?"

**C. FR coverage** (1-2 questions)
- "For the {Area X} capability area, the obvious FRs are {FR1, FR2, FR3}. Is anything missing?"
- "I see the brief mentions {feature}, but I'm not sure if it should be one FR or split into two (e.g. {option A} vs {option B}). Which?"

**D. NFRs** (1-2 questions, depending on what's known)
- "For performance, what's an acceptable response time / load target? (e.g., 'API < 200ms p95', '10k concurrent users')"
- "Any availability target? (e.g., '99.9% uptime', 'best effort')"
- "Any accessibility target? (e.g., 'WCAG 2.1 AA', 'best effort')"

**E. Domain / compliance** (only if domain triggers it)
- "This looks like a {healthcare / fintech / govtech / etc.} project — should we lock in {HIPAA / PCI-DSS / FedRAMP / WCAG} as Domain Requirements?"
- Skip this question if no compliance triggers obvious from the brief or initial intent.

**F. Phased scope** (1 question)
- "What goes in MVP vs what gets deferred to Growth/Vision? The brief's MVP looks like {summary} — does that match what you want to ship first?"

**G. Success criteria** (1 question, only if brief's metrics are vague)
- "The brief's success metric is {metric}. Can we sharpen that to a SMART metric? (e.g., target number, measurement method, timeframe)"

### Question quality bar

Each question should:
- ✅ Reference something specific from the brief or initial intent
- ✅ Offer concrete options when possible (instead of open-ended)
- ✅ Resolve a real uncertainty that would otherwise force you to fantasize
- ❌ Not be generic ("who is this for?" — you already know from the brief)
- ❌ Not ping-pong (no follow-ups in this round unless answer is unparseable)

### Format

Send all questions in one message, numbered:

```
I read the brief. Before I draft the PRD, here are the things I need to lock in:

1. **Scope**: {specific question grounded in the brief}
2. **Capability areas**: I'd cluster the brief's must-haves into {A, B, C} — work for you, or organize differently?
3. **FR coverage** (Area A): {specific question}
4. **NFRs — performance**: {specific question with concrete options}
5. **NFRs — availability**: {specific question}
6. **Domain**: {compliance question, or skip}
7. **Phasing**: {MVP vs Growth split question}
8. **Success criteria**: {SMART sharpening if needed}

(I'll generate the full PRD right after — no more questions until the review.)
```

## 4. Capture Answers (Silent)

Take the user's answers. Do **not** ask follow-ups unless an answer is so unclear it would force you to fantasize. Resist ping-pong.

Hold internally for step-03:
- `personas_used` (from brief, confirmed scope)
- `capability_areas` (5-8 logical groups, with name + 1-line description each)
- `frs_per_area` (FRs grouped under each area, with proposed stories)
- `nfrs` (specific measurable requirements per category)
- `domain_requirements` (compliance items, if any)
- `phased_scope` (MVP / Growth / Vision split)
- `success_criteria_smart` (sharpened SMART metrics)
- `journeys` (detailed primary + secondary if applicable)
- `out_of_scope` (from brief + any new ones)

## 5. Checkpoint & Transition

Recap the picture in 1–2 lines and let the user confirm before you generate the PRD:

> "Got it — {1-line recap of the capability shape and the key answers}. Ready for me to generate the full PRD, or anything to adjust first?"
>
> [A] Generate it   [D] Discuss / add more

- **[A]** → move to generation.
- **[D]** → cover the gap, then re-confirm.

→ Read fully and follow [step-03-generate.md](step-03-generate.md).
