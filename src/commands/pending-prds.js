const { findRapidDir, listPendingPrds } = require('../lib/rapid-docs');

/**
 * Print, as JSON, the PRDs that are ready to be turned into specs
 * (status `approved` or `in-progress`) with their story counts.
 * Consumed by the create-spec skill to build its picker without
 * reading every PRD into the agent's context.
 */
function run() {
  const rapidDir = findRapidDir(process.cwd());
  const list = rapidDir ? listPendingPrds(rapidDir) : [];
  process.stdout.write(JSON.stringify(list, null, 2) + '\n');
}

module.exports = { run };
