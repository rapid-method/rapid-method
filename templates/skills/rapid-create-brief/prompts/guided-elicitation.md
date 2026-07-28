# Stage 3: Guided Elicitation

**Goal:** Fill the gaps identified in Stage 2 through smart, adaptive questioning — covering all six brief topics without re-asking what you already know.

**Previous stage**: [contextual-discovery.md](contextual-discovery.md)
**Next stage**: [draft-and-review.md](draft-and-review.md)

---

## How This Stage Works

Unlike a rigid questionnaire, elicitation is **gap-driven**. Stage 2 told you what you know and what's missing. Work through the gaps, highest priority first. For topics where you already have strong context, confirm briefly and move on.

## Approach

- **One topic at a time** — never dump all questions at once
- **Reflect before asking** — show what you understood, then ask what's missing
- **Push from vague to concrete** — always
- **Capture silently** — if the user mentions something that belongs in a later topic, note it internally and weave it in when you get there. Don't redirect.
- **Soft gates** — "Anything else on this, or shall we move on?"

---

## Topics

Work through these in order, but **adapt depth based on gap level** from Stage 2.

### Topic 1: Vision & Problem

**If gap is HIGH** (blank slate — no prior context):

Open with:
> "Let's start with the foundation: the problem. What problem are you solving, and who feels it most acutely?"

Cover (over multiple exchanges, not all at once):
- **Who has this problem?** Push for specificity — not "everyone", a real type of person.
- **How acute is the pain?** Frequency, cost, emotional weight.
- **How do people solve it today?** Workarounds, competitor tools, manual processes.
- **What's broken with current solutions?** Where do they frustrate, fall short, or fail?
- **Cost of inaction** — what happens if this stays unsolved?
- **High-level solution** in 2-3 sentences. Lead with the *insight*, not the feature list.
- **Key differentiator(s)**: What's defensible? What would be hard for a competitor to copy?
- **Why now?** What changed? (tech shift, market shift, regulation, behavior change, cost curve)

If the user can't name a differentiator beyond "we'll do it better":
> "What specifically would a competitor need to copy that's hard for them?"

**If gap is LOW** (strong context from documents/brain dump):

Summarize what you know and confirm:
> "From what you've shared, the core problem is {X}, the approach is {Y}, and the key differentiator is {Z}. Does this capture it, or am I off on something?"

### Topic 2: Users & Journey

Open with:
> "Let's get specific about who this is for. Picture one real person who has this problem — what's their job, what's their day like?"

Build **one primary persona** in detail:
- **Name & role** — give them a realistic name
- **Brief backstory** — what's their day like?
- **Goals & motivations**
- **Current pain** — how do they experience the problem today?
- **Aha moment** — when using {project_name}, when does the value click?

If the user gives "anyone who needs X":
> "Let's pick one real person. Who's the *most acute* version of this user — the one who'd pay tomorrow if we shipped today?"

Then **secondary users** (if any): admins, decision-makers, partners. If none, mark N/A and move on.

Map the **primary persona's journey**:

| Stage | Question |
|-------|----------|
| Discovery | How do they find out about it? |
| Onboarding | What are their first 5 minutes like? |
| Core Usage | How do they use it day-to-day? |
| Aha Moment | When does the value click? |
| Long-term | What makes them stay? |

### Topic 3: Scope & Features

Open with:
> "What are the must-have features for v1 — the things that, if missing, would make {persona name} say 'this doesn't solve my problem'?"

Use **MoSCoW** prioritization:
- **Must Have** — each tested against: "Does this create the aha moment?"
- **Should Have** — important but not blocking launch
- **Could Have** — nice to have if time allows
- **Out of Scope** — explicitly say NO with rationale (most important list)

**Push back on bloat**: If 10+ must-haves:
> "If you could only ship three, which three would still get {persona name} to the aha moment?"

### Topic 4: Success Metrics

Open with:
> "How will we know it's working? Start from the user side — what behavior tells us they're getting real value?"

Three parts:

**User success metrics** — push from vague to specific:
| Vague | Specific |
|-------|----------|
| "Users are happy" | "70% complete onboarding within 5 minutes" |
| "Good engagement" | "Weekly retention > 40% at week 4" |

For each: metric, target, how to measure.

**Business objectives** — what the business needs to see at 3 months and 12 months.

**MVP success criteria (go/no-go gate):**
> "What signal tells us the MVP worked and we should invest in v2 — versus pivot or kill?"

Must be concrete, time-boxed, and decision-driving.

### Topic 5: Constraints & Acceptance Criteria

**Constraints:**
> "Are there constraints I should know about — things we can't change?"

Cover: technical, business, assumptions. The assumption question is the most valuable:
> "If one thing in your mental model turned out wrong and would kill this project, what would it be?"

**Acceptance criteria** — light, 1-2 per must-have in Given/When/Then:
```
Given {precondition}
When {user action}
Then {expected result}
```

Keep it light:
> "Detailed ACs belong in the PRD or spec. Here we just need alignment."

### Topic 6: Future Vision

> "If this is wildly successful in 2-3 years, what does it become?"

2-4 sentences. Post-MVP capabilities, new segments, platform plays. Inspiring, not a commitment.

If the user starts spec'ing v2 in detail:
> "Save the details — let's capture the *direction*. The shape of v2 will emerge once we see how v1 lands."

---

## After All Topics

When all topics are covered, recap and confirm before drafting:

> "That covers what I need: {1-line recap — problem, who it's for, core scope}. Ready for me to draft the brief, or anything to add first?"
>
> [A] Draft it   [D] One more thing to cover

- **[A]** → proceed to draft.
- **[D]** → cover the addition, then re-confirm.

→ Read fully and follow [draft-and-review.md](draft-and-review.md).
