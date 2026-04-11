# Step 4: Scope & Features

**Goal**: Define the v1 feature set using **MoSCoW** prioritization, with explicit **out-of-scope** boundaries to prevent creep.

**Previous step**: [step-03-users.md](step-03-users.md)
**Next step**: [step-05-metrics.md](step-05-metrics.md)

---

## 1. Open the Conversation

> "Now let's get concrete. What are the must-have features for v1 — the things that, if missing, would make {persona name} say 'this doesn't solve my problem'?"

## 2. Must-Have Features

For each must-have, capture:

- **Name** (short, action-oriented)
- **Why it's essential** — which part of the persona's journey or aha moment does it enable?

**The aha test**: For each must-have, ask:
> "Does this feature directly create the aha moment we defined for {persona name}?"

If not, it's probably a should-have, not a must-have.

**Push back on bloat**: If the user lists 10+ must-haves, challenge:
> "If you could only ship three of these, which three would still get {persona name} to the aha moment?"

Be a peer who fights scope creep — that's the value you bring here.

## 3. Should-Have Features

Important but not blocking launch. The user would be sad to ship without them, but the persona still gets value.

## 4. Could-Have Features

Nice to have if time allows. Differentiation, polish, edge cases.

## 5. Out of Scope (the most important section)

Explicitly list what you're **intentionally saying NO to** for v1, with the rationale.

> "What features have come up that we're deliberately *not* doing in v1? And why?"

Examples of good out-of-scope items:
- "Multi-tenant support — single user is enough to validate the core loop"
- "Mobile app — desktop is where the persona lives during work hours"
- "Integrations with X, Y, Z — manual import is acceptable for v1 to ship faster"

Each out-of-scope item should have a one-line rationale. This prevents future "but didn't we agree to..." debates.

## 6. Reflect & Confirm

```
Here's the v1 scope:

**Must Have ({count}):**
- {feature} — {why}
- ...

**Should Have ({count}):**
- {feature} — {why}

**Could Have ({count}):**
- {feature} — {why}

**Out of Scope ({count}):**
- {feature} — {rationale}

Does this match what we should ship?
```

Iterate until confirmed.

## 7. Append to Brief

Fill the **Core Features (MVP Scope)** section:

- Must Have list
- Should Have list
- Could Have list
- Out of Scope list

Update frontmatter: `stepsCompleted: [1, 2, 3, 4]`. Save.

## 8. Transition

> "Scope locked. Now let's define how we'll know it's working — what does success look like?"

→ Read fully and follow [step-05-metrics.md](step-05-metrics.md).
