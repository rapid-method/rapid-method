# Releasing

Releases are published to npm by CI when a `vX.Y.Z` git tag is pushed. Never run
`npm publish` by hand — the workflow runs the tests and publishes from a clean
checkout.

## How publishing authenticates

There is **no npm token in this repository.** Publishing uses npm *trusted
publishing* over OpenID Connect: the workflow proves its own identity to npm,
which mints a credential that lasts only for that run. Nothing long-lived exists
to leak, rotate or misname.

The trust is registered on npmjs.com (package → Settings → Trusted publisher) and
is pinned to three things:

| | |
|---|---|
| Organization / user | `rapid-method` |
| Repository | `rapid-method` |
| Workflow filename | `release.yml` |

**Renaming `.github/workflows/release.yml` breaks publishing** — npm matches the
filename, and the failure surfaces as a `403` at publish time, not as anything
that looks like a rename problem. If the file must move, update the trusted
publisher first.

The workflow also upgrades npm before publishing: trusted publishing needs
npm ≥ 11.5.1 and Node 22 still ships npm 10.

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
   `main` requires a pull request with a green `test` check and one approval, so
   unless you are an org admin (who bypasses those rules), the version bump goes
   through a PR first and only the tag is pushed here.
5. The **Release** workflow runs on the tag: it installs, runs `npm test`,
   verifies the tag matches `package.json`, publishes to npm, and creates a
   GitHub Release with generated notes.

`v*` tags are protected — only org admins can create, move or delete them, since
pushing one is what publishes to npm.

## Versioning (semver)

- **patch** — bug fixes, doc/template tweaks, no behavior change for users.
- **minor** — new commands, new skills, backward-compatible additions.
- **major** — breaking changes to the CLI, installed layout, or config format.

## Verifying

After the workflow finishes:

```bash
npm view rapid-method version              # should show the new version
npm view rapid-method dist.attestations    # provenance should be present
npx rapid-method@latest install            # smoke-test the published package
```

The attestation is generated automatically by trusted publishing: it links the
tarball back to the exact commit and workflow run that produced it, so anyone can
verify the package was built from this repository rather than uploaded by hand.
Its absence on a new version means something published outside this pipeline.
