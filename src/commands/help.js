const { print, color, bar } = require('../lib/ui');

function run() {
  print(bar);
  print(color('RAPID', 'bright') + ' - A lean methodology for AI-driven development');
  print(bar);
  print(color('Usage:', 'yellow'));
  print('  npx rapid-method <command>');
  print(bar);
  print(color('Commands:', 'yellow'));
  print('  install         Install RAPID in current project');
  print('  pending-prds    List pending PRDs (JSON) for the create-spec skill');
  print('  pending-specs   List actionable specs (JSON) for the dev skill');
  print('  help            Show this help message');
  print(bar);
  print(color('Example:', 'yellow'));
  print('  npx rapid-method install');
  print(bar);
}

module.exports = { run };
