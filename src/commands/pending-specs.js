const { findRapidDir, listPendingSpecs } = require('../lib/rapid-docs');

/**
 * Print, as JSON, the actionable specs (WIP drafts, `ready-for-dev`,
 * `in-progress`) with their task counts. Consumed by the dev skill
 * (and the create-spec WIP check) to build a picker without reading
 * every spec into the agent's context.
 */
function run() {
  const rapidDir = findRapidDir(process.cwd());
  const list = rapidDir ? listPendingSpecs(rapidDir) : [];
  process.stdout.write(JSON.stringify(list, null, 2) + '\n');
}

module.exports = { run };
