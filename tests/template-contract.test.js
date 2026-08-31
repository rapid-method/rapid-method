/**
 * Template ↔ parser contract tests.
 *
 * The pending-prds / pending-specs commands parse the PRD and tech-spec
 * markdown produced from the templates in templates/rapid/templates/. If a
 * template changes shape (frontmatter field renamed, spec-table Status column
 * moved, "## Tasks" heading or checkbox format changed) the parser would
 * silently miscount. These tests fail loudly on that drift so the template and
 * src/lib/rapid-docs.js are kept in sync.
 */

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { parseFrontmatter, countSpecs, countTasks } = require('../src/lib/rapid-docs');

const TEMPLATES = path.join(__dirname, '..', 'templates', 'rapid', 'templates');
const read = (file) => fs.readFileSync(path.join(TEMPLATES, file), 'utf8');

// Fields each command reads from frontmatter (see src/lib/rapid-docs.js).
const PRD_REQUIRED_FM = ['title', 'created', 'status'];
const SPEC_REQUIRED_FM = ['title', 'created', 'status', 'stepsCompleted', 'branch'];

test('PRD template exposes the frontmatter fields the parser reads', () => {
  const fm = parseFrontmatter(read('prd-template.md'));
  for (const key of PRD_REQUIRED_FM) {
    assert.ok(key in fm, `prd-template.md frontmatter is missing "${key}" — listPendingPrds depends on it`);
  }
});

test('PRD template spec table still matches the spec parser', () => {
  const { total, notStarted } = countSpecs(read('prd-template.md'));
  assert.ok(total >= 1, 'no spec rows matched `| S<n>.<n> | … |` — spec ID format or table changed');
  assert.ok(notStarted >= 1, 'no spec ended with "not started" — Status column moved or renamed');
});

test('spec template exposes the frontmatter fields the parser reads', () => {
  const fm = parseFrontmatter(read('tech-spec-template.md'));
  for (const key of SPEC_REQUIRED_FM) {
    assert.ok(key in fm, `tech-spec-template.md frontmatter is missing "${key}" — listPendingSpecs depends on it`);
  }
});

test('spec template Tasks section still matches the task parser', () => {
  const content = read('tech-spec-template.md');
  assert.match(content, /^##\s+Tasks\b/m, 'no "## Tasks" heading — countTasks is scoped to that section');
  const { total } = countTasks(content);
  assert.ok(total >= 1, 'no `- [ ]` checkbox tasks matched inside ## Tasks — task format changed');
});
