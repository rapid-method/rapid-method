#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

// Customize prompts symbols
try {
  const promptsStyle = require('prompts/lib/util/style');
  promptsStyle.symbol = (done, aborted, exited) => {
    if (aborted) return '\x1b[31m■\x1b[0m ';
    if (exited) return '\x1b[33m■\x1b[0m ';
    if (done) return '◇ ';
    return '◇ ';
  };
  promptsStyle.delimiter = () => '';
} catch {}

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

const bar = '│';
const finishBar = '└';
const div = '━';

function color(text, colorName) {
  return `${COLORS[colorName]}${text}${COLORS.reset}`;
}

function print(text = '') {
  console.log(text);
}

function getSystemUserName() {
  return process.env.USER || process.env.USERNAME || process.env.LOGNAME || '';
}

function getVersion() {
  try {
    const pkgPath = path.join(__dirname, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    return pkg.version;
  } catch {
    return '1.0.0';
  }
}

function printHeader() {
  const version = `v${getVersion()}`;
  const width = process.stdout.columns || 80;
  const prefix = bar + '  ';
  const boxWidth = width - 3;

  const logo = [
    '██████╗  █████╗ ██████╗ ██╗██████╗ ',
    '██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗',
    '██████╔╝███████║██████╔╝██║██║  ██║',
    '██╔══██╗██╔══██║██╔═══╝ ██║██║  ██║',
    '██║  ██║██║  ██║██║     ██║██████╔╝',
    '╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ',
  ];

  const tagline = 'Requirements · Architecture · Patterns · Implementation · Delivery';

  const centerPad = (str, totalWidth) => {
    const pad = Math.max(0, Math.floor((totalWidth - str.length) / 2));
    return ' '.repeat(pad) + str;
  };

  const fillLine = (content, totalWidth) => {
    const contentLen = content.replace(/\x1b\[[0-9;]*m/g, '').length;
    const rightPad = Math.max(0, totalWidth - contentLen - 2);
    return color('║', 'blue') + content + ' '.repeat(rightPad) + color('║', 'blue');
  };

  // Top border with version inside
  const versionLabel = ` ${version} `;
  const leftEquals = 2;
  const rightEquals = Math.max(0, boxWidth - 2 - leftEquals - versionLabel.length);
  print(prefix + color('╔' + '═'.repeat(leftEquals) + versionLabel + '═'.repeat(rightEquals) + '╗', 'blue'));

  // Empty line
  print(prefix + fillLine('', boxWidth));

  // Logo centered
  for (const line of logo) {
    const centered = centerPad(line, boxWidth - 2);
    print(prefix + color('║', 'blue') + color(centered, 'blue') + ' '.repeat(Math.max(0, boxWidth - 2 - centered.length)) + color('║', 'blue'));
  }

  // Empty line
  print(prefix + fillLine('', boxWidth));

  // Tagline centered
  const taglineCentered = centerPad(tagline, boxWidth - 2);
  print(prefix + color('║', 'blue') + color(taglineCentered, 'dim') + ' '.repeat(Math.max(0, boxWidth - 2 - taglineCentered.length)) + color('║', 'blue'));

  // Empty line
  print(prefix + fillLine('', boxWidth));

  // Bottom border
  print(prefix + color('╚' + '═'.repeat(boxWidth - 2) + '╝', 'blue'));

  print(bar);
}

function printDiv() {
  const width = process.stdout.columns || 80;
  const boxWidth = width - 3;

  const prefix = bar + '  ';

  print(prefix + div.repeat(boxWidth));
}

function printHelp() {
  print(bar);
  print(color('RAPID', 'bright') + ' - A lean methodology for AI-driven development');
  print(bar);
  print(color('Usage:', 'yellow'));
  print('  npx rapid-method <command>');
  print(bar);
  print(color('Commands:', 'yellow'));
  print('  install     Install RAPID in current project');
  print('  help        Show this help message');
  print(bar);
  print(color('Example:', 'yellow'));
  print('  npx rapid-method install');
  print(bar);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function install() {
  const templatesDir = path.join(__dirname, '..', 'templates');

  printHeader();

  printDiv();
  print(bar);

  // Handle cancellation
  const onCancel = () => {
    print(bar);
    print(`${finishBar}  ${color('Installation cancelled.', 'red')}`);
    process.exit(0);
  };

  // Installation directory
  const { targetDir } = await prompts({
    type: 'text',
    name: 'targetDir',
    message: 'Installation directory:',
    initial: process.cwd(),
  }, { onCancel });

  const dirExists = fs.existsSync(targetDir);
  const isEmpty = dirExists && fs.readdirSync(targetDir).filter(f => !f.startsWith('.')).length === 0;

  print(bar);

  print(`${color('●', 'blue')}  Resolved installation path: ${color(targetDir, 'cyan')}`);
  if (dirExists) {
    print(`${bar}  Directory exists${isEmpty ? ' and is empty' : ''}`);
  }
  print(bar);

  const { shouldInstall } = await prompts({
    type: 'toggle',
    name: 'shouldInstall',
    message: 'Install to this directory?',
    initial: true,
    active: 'Yes',
    inactive: 'No',
  }, { onCancel });

  if (!shouldInstall) {
    print(bar);
    print(color('Installation cancelled.', 'yellow'));
    return;
  }

  print(bar);
  printDiv();
  print(bar);
  
  print(color('◆', 'magenta') + color('  Configuring RAPID Core', 'bright'));
  print(bar);

  const defaultUserName = getSystemUserName();

  const { userName } = await prompts({
    type: 'text',
    name: 'userName',
    message: 'What should agents call you?',
    initial: defaultUserName,
  }, { onCancel });

  print(`${color('◇', 'cyan')} What language should agents use when chatting with you?`);
  const { communicationLanguage } = await prompts({
    type: 'text',
    name: 'communicationLanguage',
    message: '',
    initial: 'English',
  }, { onCancel });

  print(`${color('◇', 'cyan')} Preferred document output language?`);
  const { documentLanguage } = await prompts({
    type: 'text',
    name: 'documentLanguage',
    message: '',
    initial: 'English',
  }, { onCancel });

  print(`${color('◇', 'cyan')} Project name?`);
  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: '',
    initial: path.basename(targetDir),
  }, { onCancel });

  print(bar);
  print(`${color('●', 'blue')} Installing RAPID...`);

  // Create directories
  const rapidDir = path.join(targetDir, '_rapid');
  const skillsDir = path.join(targetDir, '.claude', 'skills');

  fs.mkdirSync(rapidDir, { recursive: true });
  fs.mkdirSync(path.join(rapidDir, 'output', 'prd'), { recursive: true });
  fs.mkdirSync(path.join(rapidDir, 'output', 'specs'), { recursive: true });
  fs.mkdirSync(path.join(rapidDir, 'templates'), { recursive: true });
  fs.mkdirSync(skillsDir, { recursive: true });

  // Copy templates
  const rapidTemplatesDir = path.join(templatesDir, 'rapid', 'templates');
  if (fs.existsSync(rapidTemplatesDir)) {
    copyDir(rapidTemplatesDir, path.join(rapidDir, 'templates'));
  }

  // Copy skills
  const skillsTemplatesDir = path.join(templatesDir, 'skills');
  if (fs.existsSync(skillsTemplatesDir)) {
    copyDir(skillsTemplatesDir, skillsDir);
  }

  // Create config.yaml
  const config = `# RAPID Methodology Configuration
# ================================

# Project
project_name: "${projectName}"
project_version: "1.0.0"

# User
user_name: "${userName}"
communication_language: "${communicationLanguage}"
document_language: "${documentLanguage}"

# Paths
output_folder: "{project-root}/_rapid/output"
prd_folder: "{project-root}/_rapid/output/prd"
specs_folder: "{project-root}/_rapid/output/specs"
project_context: "{project-root}/_rapid/project-context.md"
project_patterns: "{project-root}/_rapid/project-patterns.md"
templates_folder: "{project-root}/_rapid/templates"

# Workflow
auto_commit: false
run_tests_after_impl: true
test_command: ""
build_command: ""
lint_command: ""

# Review
enable_review: true
review_strictness: "standard"

# Spec limits
max_spec_tokens: 1600
spec_warning_threshold: 1200

# Initialized
initialized: true
`;

  fs.writeFileSync(path.join(rapidDir, 'config.yaml'), config);

  print(`${color('│', 'dim')} Created ${color('_rapid/', 'cyan')}`);
  print(`${color('│', 'dim')} Created ${color('.claude/skills/', 'cyan')}`);
  print(bar);
  print(`${color('●', 'green')} ${color('RAPID installed successfully!', 'green')}`);

  print(bar);
  print(color('◆', 'magenta') + color(' Next Steps', 'bright'));
  print(bar);
  print(`${color('│', 'dim')} ${color('rapid create-context', 'cyan')}  - Document your project context`);
  print(`${color('│', 'dim')} ${color('rapid create-patterns', 'cyan')} - Define coding patterns`);
  print(`${color('│', 'dim')} ${color('rapid quick-dev', 'cyan')}       - Start developing`);
  print(finishBar);
}

// Main
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'install':
    install().catch(console.error);
    break;
  case 'help':
  case '--help':
  case '-h':
    printHelp();
    break;
  default:
    if (command) {
      print(color(`Unknown command: ${command}`, 'red'));
    }
    printHelp();
    process.exit(command ? 1 : 0);
}
