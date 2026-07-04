# Stage 2: Contextual Discovery

**Goal:** Build a rich understanding of the product space by analyzing user-provided artifacts and conducting targeted web research — before asking a single elicitation question.

**Previous stage**: SKILL.md (Stage 1: Understand Intent)
**Next stage**: [guided-elicitation.md](guided-elicitation.md)

---

## Why This Stage Exists

Questions are expensive — every question the user has to answer is friction. The more context you gather autonomously *before* asking, the smarter and fewer your questions will be in Stage 3.

## 1. Gather Artifact Paths

From Stage 1 you should have:
- The user's brain dump / description of the product
- A list of document paths the user mentioned (if any)
- Understanding of the brief type (commercial product, internal tool, research, etc.)

If the user provided no documents, skip to section 3.

## 2. Fan Out Subagents for Artifact Analysis

For each document the user provided, launch a subagent to read and extract:

- **Key facts** relevant to a product brief (problem, users, market, scope, constraints)
- **Quotes or data points** worth preserving
- **Gaps** — what's missing or unclear that should be asked about

Subagent instructions:
> Read {file_path} fully. Extract facts relevant to building a product brief: problem definition, target users, market context, competitive landscape, scope decisions, constraints, metrics, and any stated assumptions. List gaps — things that are unclear, contradictory, or missing. Return a structured summary under 500 words.

Collect all subagent results before proceeding.

## 3. Web Research (if applicable)

If the product operates in a market with competitors, trends, or regulatory context worth understanding:

Launch a subagent for targeted web research:
> Research the market for {product description}. Find: (1) top 3 competitors and how they position themselves, (2) relevant market trends or shifts, (3) any regulatory or compliance considerations. Return a structured summary under 400 words with source URLs.

**Skip web research** for internal tools, personal projects, or when the user explicitly says the context is self-contained.

## 4. Synthesize a Context Brief

Combine everything — user brain dump, artifact extractions, web research — into an internal context brief. This is for your use, not shown to the user. Structure:

- **Product intent** (from Stage 1)
- **Key facts from documents** (grouped by topic)
- **Market context** (if researched)
- **Known gaps** — things you still need to ask about

## 5. Identify Elicitation Priorities

Compare what you know against the six brief topics:

| Topic | What's needed | What you have | Gap level |
|-------|--------------|---------------|-----------|
| Vision & Problem | Problem, solution, differentiators, why now | ... | Low / Medium / High |
| Users & Journey | Named personas, journey stages, aha moment | ... | ... |
| Scope & Features | MoSCoW features, out of scope | ... | ... |
| Success Metrics | User metrics, business objectives, MVP gate | ... | ... |
| Constraints & ACs | Technical/business constraints, acceptance criteria | ... | ... |
| Future Vision | 2-3 year direction | ... | ... |

This gap analysis drives Stage 3 — high-gap topics get deep questioning, low-gap topics get quick confirmation.

## 6. Transition

Tell the user what you learned (briefly — don't dump everything):

```
I've reviewed {what you analyzed}. I have a good picture of {strong areas}.
I still need to dig deeper on {gap areas}.

Let's talk through {first high-gap topic}. {Opening question}
```

Lead directly into the first question — don't wait for permission to start.

→ Read fully and follow [guided-elicitation.md](guided-elicitation.md).
