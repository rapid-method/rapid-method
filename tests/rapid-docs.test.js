const { test } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const {
  parseFrontmatter,
  countSpecs,
  countTasks,
  listPendingPrds,
  listPendingSpecs,
} = require('../src/lib/rapid-docs');

const FIXTURE_RAPID = path.join(__dirname, 'fixtures', '_rapid');

test('parseFrontmatter reads YAML block, {} when absent', () => {
  const fm = parseFrontmatter("---\ntitle: 'X'\nstatus: 'approved'\n---\n# body");
  assert.strictEqual(fm.title, 'X');
  assert.strictEqual(fm.status, 'approved');
  assert.deepStrictEqual(parseFrontmatter('# no frontmatter'), {});
});

test('countSpecs counts total and not-started from tables', () => {
  const md = [
    '| ID | As a | Status |',
    '| S1.1 | u | not started |',
    '| S1.2 | u | in spec |',
    '| S2.1 | u | not started |',
    '| notarow | u | done |',
  ].join('\n');
  assert.deepStrictEqual(countSpecs(md), { total: 3, notStarted: 2 });
});

test('countTasks only counts inside the Tasks section', () => {
  const md = [
    '## Tasks',
    '### Task 1',
    '- [x] a -- done',
    '- [ ] b -- todo',
    '## Verification',
    '- [ ] should NOT count',
  ].join('\n');
  assert.deepStrictEqual(countTasks(md), { total: 2, done: 1 });
});

test('listPendingPrds returns approved/in-progress with counts, excludes done', () => {
  const prds = listPendingPrds(FIXTURE_RAPID);
  assert.strictEqual(prds.length, 1);
  const prd = prds[0];
  assert.strictEqual(prd.status, 'approved');
  assert.strictEqual(prd.title, 'Authentication');
  assert.strictEqual(prd.specs_total, 3);
  assert.strictEqual(prd.specs_not_started, 2);
  assert.strictEqual(prd.path, 'prds/prd-approved.md');
});

test('listPendingSpecs returns wip + in-progress, excludes done, counts tasks', () => {
  const specs = listPendingSpecs(FIXTURE_RAPID);
  const byStatus = Object.fromEntries(specs.map((s) => [s.status, s]));
  assert.strictEqual(specs.length, 2);
  assert.ok(byStatus.wip, 'wip spec present');
  assert.strictEqual(byStatus.wip.step, 2);
  assert.ok(byStatus['in-progress'], 'in-progress spec present');
  assert.strictEqual(byStatus['in-progress'].tasks_total, 3);
  assert.strictEqual(byStatus['in-progress'].tasks_done, 2);
  assert.strictEqual(byStatus['in-progress'].branch, 'feature/checkout');
  assert.ok(!specs.some((s) => s.status === 'done'), 'done excluded');
});

test('missing folder yields empty list', () => {
  assert.deepStrictEqual(listPendingPrds(path.join(__dirname, 'nope')), []);
  assert.deepStrictEqual(listPendingSpecs(path.join(__dirname, 'nope')), []);
});
