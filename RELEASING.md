# Releasing

Releases are published to npm by CI when a `vX.Y.Z` git tag is pushed. Never run
`npm publish` by hand — the workflow runs the tests and publishes from a clean
checkout.

## One-time setup

Add an **`NPM_TOKEN`** repository secret (Settings → Secrets and variables →
Actions): an npm **automation** token with publish rights on the `rapid-method`
package. The release workflow reads it as `NODE_AUTH_TOKEN`.

## Cutting a release

1. Make sure `main` is green (the CI workflow passes) and everything you want to
   ship is merged.
2. Move the `## [Unreleased]` items in [CHANGELOG.md](CHANGELOG.md) under a new
   `## [X.Y.Z] - YYYY-MM-DD` heading.
3. Bump the version — this updates `package.json` and creates the matching commit
   and tag:
   ```bash
   npm version minor   # or: patch | major
   ```
4. Push the commit and the tag:
   ```bash
   git push --follow-tags
   ```
5. The **Release** workflow runs on the tag: it installs, runs `npm test`,
   verifies the tag matches `package.json`, publishes to npm, and creates a
   GitHub Release with generated notes.

## Versioning (semver)

- **patch** — bug fixes, doc/template tweaks, no behavior change for users.
- **minor** — new commands, new skills, backward-compatible additions.
- **major** — breaking changes to the CLI, installed layout, or config format.

## Verifying

After the workflow finishes:

```bash
npm view rapid-method version   # should show the new version
npx rapid-method@latest install # smoke-test the published package
```
