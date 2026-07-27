/**
 * rapid-docs — read-only helpers to scan _rapid/output for pending PRDs and specs.
 *
 * The goal is token efficiency for the skills: instead of the agent opening and
 * reading every PRD/spec to build a picker, these functions parse only the
 * metadata (frontmatter + story/task status counts) and return compact objects.
 * The full document is read (by the skill) only for the single item the user picks.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

/**
 * Walk up from `startDir` looking for a directory that contains `_rapid/`.
 * Returns the absolute path to that `_rapid` directory, or null if not found.
 */
function findRapidDir(startDir) {
  let dir = path.resolve(startDir || process.cwd());
  while (true) {
    const candidate = path.join(dir, '_rapid');
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return null; // reached filesystem root
    dir = parent;
  }
}

/** Parse the leading YAML frontmatter block. Returns {} when absent/invalid. */
function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  try {
    return yaml.parse(m[1]) || {};
  } catch {
    return {};
  }
}

/**
 * Count PRD user stories from the markdown tables.
 * Story rows look like: `| S1.1 | ... | must | not started |`
 * The Status is the last cell.
 */
function countStories(content) {
  let total = 0;
  let notStarted = 0;
  for (const line of content.split('\n')) {
    if (!/^\|\s*S\d+\.\d+\s*\|/.test(line)) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length === 0) continue;
    total += 1;
    const status = cells[cells.length - 1].toLowerCase();
    if (status === 'not started') notStarted += 1;
  }
  return { total, notStarted };
}

/**
 * Count spec tasks (checkbox items) inside the `## Tasks` section only,
 * so unrelated checkbox lists elsewhere are not counted.
 */
function countTasks(content) {
  let inTasks = false;
  let total = 0;
  let done = 0;
  for (const line of content.split('\n')) {
    if (/^##\s+Tasks\b/i.test(line)) {
      inTasks = true;
      continue;
    }
    if (inTasks && /^##\s+/.test(line)) break; // next H2 ends the section
    if (!inTasks) continue;
    const m = line.match(/^\s*-\s*\[( |x|X)\]/);
    if (m) {
      total += 1;
      if (m[1].toLowerCase() === 'x') done += 1;
    }
  }
  return { total, done };
}

/** List PRDs with status `approved` or `in-progress`, with story counts. */
function listPendingPrds(rapidDir) {
  const dir = path.join(rapidDir, 'output', 'prds');
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    let content;
    try {
      content = fs.readFileSync(path.join(dir, file), 'utf8');
    } catch {
      continue;
    }
    const fm = parseFrontmatter(content);
    const status = String(fm.status || '').trim();
    if (status !== 'approved' && status !== 'in-progress') continue;
    const { total, notStarted } = countStories(content);
    out.push({
      path: `prds/${file}`,
      title: String(fm.title || file).trim(),
      status,
      created: String(fm.created || '').trim(),
      stories_total: total,
      stories_not_started: notStarted,
    });
  }
  return out;
}

/**
 * List actionable specs (not `done`): WIP drafts, `ready-for-dev`, `in-progress`.
 * WIP is detected by the `-wip.md` filename; `step` is how many steps are complete.
 */
function listPendingSpecs(rapidDir) {
  const dir = path.join(rapidDir, 'output', 'specs');
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    let content;
    try {
      content = fs.readFileSync(path.join(dir, file), 'utf8');
    } catch {
      continue;
    }
    const fm = parseFrontmatter(content);
    const isWip = file.endsWith('-wip.md');
    const status = isWip ? 'wip' : String(fm.status || '').trim();
    if (!['wip', 'ready-for-dev', 'in-progress'].includes(status)) continue;
    const { total, done } = countTasks(content);
    const entry = {
      path: `specs/${file}`,
      title: String(fm.title || file).trim(),
      status,
      created: String(fm.created || '').trim(),
      tasks_total: total,
      tasks_done: done,
    };
    if (isWip) {
      entry.step = Array.isArray(fm.stepsCompleted) ? fm.stepsCompleted.length : 0;
    }
    if (fm.branch) entry.branch = String(fm.branch).trim();
    out.push(entry);
  }
  return out;
}

module.exports = {
  findRapidDir,
  parseFrontmatter,
  countStories,
  countTasks,
  listPendingPrds,
  listPendingSpecs,
};
