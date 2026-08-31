# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-08-31

The first release since `1.0.2` (March 2026). npm had been stuck there while
`main` advanced significantly; this ships everything below.

### Added
- Multi-platform install support.
- **Plan Flow**: `rapid create-prd` and PRD ↔ spec integration.
- Read-only CLI commands `pending-prds` and `pending-specs` that scan
  `_rapid/output` and return compact JSON, so the create-spec / dev skills build
  their pickers without reading every document into context.
- Test suite (`node --test`): parser unit tests plus a PRD/spec template ↔ parser
  contract gate.
- CI workflow (tests on push/PR) and a tag-triggered npm release workflow.

### Changed
- **Output layout**: all generated artifacts now live in a configurable sibling
  folder (`_rapid-output` by default, named during install) instead of being
  split between `_rapid/output` and `_rapid/`. The brief is a single `brief.md`
  at its root; `architecture.md` and `patterns.md` sit alongside it (dropping the
  `project-` prefix and moving out of `_rapid/`); PRDs and specs are in `prds/`
  and `specs/`. The `briefs/` subfolder is gone. `_rapid/` now holds only the
  install (config + templates).
- The `project-` prefix is now dropped from the **template** files too, finishing
  what the output-layout change started: `_rapid/templates/architecture-template.md`
  and `patterns-template.md`. The skills that name them were updated; nothing else
  referenced them by name.
- Modularized the CLI installer architecture (`src/commands`, `src/installers`,
  `src/lib`).
- Restructured skills: create-brief into a 5-stage discovery flow; create-prd,
  create-spec and dev into topical step files with just-in-time loading.
- Reworked the interaction model across skills: agents embody their role instead
  of narrating it, each skill defines a `Tone`, reviews ask the essential
  findings as questions before showing a prose overview, and each step ends with
  an `[A] continue / [D] discuss` checkpoint (all skills except dev).
- **PRD vocabulary**: "user stories" are now **specs**, and "capability areas"
  are now **epics** — the second name the skills already used informally. A spec
  is now one unit across its whole life (planned in the PRD, written by
  `create-spec`, implemented by `dev`) instead of a story that converts into a
  spec, so the traceability chain loses a step: FR → spec → implementation. The
  `S{N}.{M}` ID format and the Status column are unchanged, so PRDs already
  written still parse; the `pending-prds` JSON keys are now `specs_total` /
  `specs_not_started`, and `countStories` is `countSpecs`.
- **create-brief proposes scope instead of asking for it.** Topic 3 now drafts
  the MoSCoW split from the aha moment and asks the user to correct it, and the
  out-of-scope list is proposed rather than requested — users rarely volunteer
  what they are *not* building, but they react sharply to seeing it written down.
- **create-architecture loads the brief, and handles greenfield.** It previously
  read only `config.yaml`, so it re-asked what the brief had already settled. It
  now reads `brief.md` first, then splits: with code on disk it confirms what it
  detected; with nothing on disk it proposes two or three genuinely different
  options with concrete trade-offs and a recommendation it will defend,
  calibrated to how technical the user turns out to be rather than by asking them
  to self-assess.

### Removed
- The "Open Questions" section from the product-brief and PRD templates
  (uncertainty is captured inline via `[needs validation]`).

## [1.0.2] - 2026-03-29

- Last version published to npm before the changes above.
