# Stage 2: Guided Discovery

Walk the user through building the brief conversationally — one topic at a time, with reflection and soft gates.

## Approach

This is a **conversation, not a questionnaire**. For each topic:

1. **Lead with what you already know** — "From what you told me, it sounds like [X]. Is that right?"
2. **Ask one targeted question** to fill the gap
3. **Reflect and confirm** — paraphrase back
4. **Soft gate** — "Anything else on this, or shall we move on?"

If the user gives rich, complete answers across multiple topics at once — great. Don't force them to repeat things. Adapt to their energy.

## Silent Capture Rule

During the conversation, the user will naturally mention things that belong in later sections (technical constraints while discussing vision, metrics while discussing features, etc.). **Do not redirect them.** Silently note these details and weave them into the right sections when drafting.

---

## Topic 1: Vision & Problem (required)

**Goal**: Understand the core problem, who has it, and the proposed solution.

Questions to cover (conversationally, not as a list):
- What problem are we solving? Who feels this pain?
- How do people solve this today? What's frustrating about it?
- What's the high-level solution? (2-3 sentences)
- What's the insight that makes this approach different?

**When you have enough**: You can articulate the problem, the affected audience, and the proposed solution in your own words.

**Transition**: Reflect your understanding of the vision, then:
> "Now let's talk about who exactly we're building this for."

---

## Topic 2: Users & Value (required)

**Goal**: Define target users and what success looks like for them.

Questions to cover:
- Who are the target users? (types/personas)
- Who feels the problem most acutely? (primary user)
- What's the "aha moment" — when do they realize they need this?
- How does this fit into their existing workflow or habits?

**When you have enough**: You can describe at least one clear user type with their primary need.

**Transition**: Reflect the user types, then:
> "Good — now let's figure out what we're actually building. What are the must-have features?"

---

## Topic 3: Core Features (required)

**Goal**: Define features using MoSCoW prioritization.

Questions to cover:
- What are the must-have features for v1? (What absolutely needs to work?)
- What are the should-have features? (Important but not blocking launch)
- What are the could-have features? (Nice to have if time allows)
- What's explicitly NOT in scope for v1?

**Tip**: If the user lists many features, help them prioritize. Ask: "If you could only ship three of these, which three?"

**When you have enough**: You have at least 2-3 must-have features with clear purpose.

**Transition**: Reflect the feature set, then:
> "Let's define how we'll know this is working — what does success look like?"

---

## Topic 4: Success Metrics (recommended)

**Goal**: Define measurable success criteria.

Questions to cover:
- How will we know this is working? What signals matter?
- What specific targets or thresholds would indicate success?
- How will we measure these?

**If the user is unsure**: Suggest common metrics for their product type (engagement, retention, conversion, error rate, etc.) and let them pick.

**When you have enough**: At least 1-2 concrete metrics with targets.

**Transition**: Reflect the metrics, then:
> "Almost there — are there any constraints or assumptions we should document?"

---

## Topic 5: Constraints & Assumptions (recommended)

**Goal**: Surface technical/business constraints and underlying assumptions.

Questions to cover:
- Any technical constraints? (platform, language, integrations, infra)
- Any business constraints? (timeline, budget, team size, compliance)
- What assumptions are we making that could turn out to be wrong?

**When you have enough**: Key constraints are captured. Don't force it if the user doesn't have strong constraints.

**Transition**: Reflect constraints, then:
> "Last section — let's define acceptance criteria for the must-have features."

---

## Topic 6: Acceptance Criteria (required)

**Goal**: Define Given/When/Then scenarios for must-have features.

For each must-have feature from Topic 3:
- Walk through one key scenario
- Use Given/When/Then format
- Ask: "Any edge cases we should capture for this one?"

**Tip**: Don't over-engineer this. 1-2 scenarios per must-have feature is enough for a brief. More detail comes in the PRD/spec stage.

---

## When to Move On

You're ready to draft when you have solid coverage of:
- [ ] Clear problem and who it affects
- [ ] Proposed solution and why it's different
- [ ] At least one target user type
- [ ] Must-have features (2-3 minimum)
- [ ] At least one success metric
- [ ] Key acceptance criteria

**Early draft offer**: If the user provides rich, confident answers covering most areas in 3-4 exchanges, proactively offer:
> "I think I have enough to draft the brief. Want me to go ahead, or is there anything else you'd like to cover first?"

→ **Route to**: `prompts/draft-and-review.md`
