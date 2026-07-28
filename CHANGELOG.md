# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

The published npm package has been stuck at `1.0.2` (March 2026) while `main`
advanced significantly. The next tagged release ships everything below — likely
as `1.1.0` (backward-compatible additions).

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
- Modularized the CLI installer architecture (`src/commands`, `src/installers`,
  `src/lib`).
- Restructured skills: create-brief into a 5-stage discovery flow; create-prd,
  create-spec and dev into topical step files with just-in-time loading.
- Reworked the interaction model across skills: agents embody their role instead
  of narrating it, each skill defines a `Tone`, reviews ask the essential
  findings as questions before showing a prose overview, and each step ends with
  an `[A] continue / [D] discuss` checkpoint (all skills except dev).

### Removed
- The "Open Questions" section from the product-brief and PRD templates
  (uncertainty is captured inline via `[needs validation]`).

## [1.0.2] - 2026-03-29

- Last version published to npm before the changes above.
