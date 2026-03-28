#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function color(text, colorName) {
  return `${COLORS[colorName]}${text}${COLORS.reset}`;
}

function print(text) {
  console.log(text);
}

function printHeader() {
  print('');
  print(color('╔══════════════════════════════════════════════════════════╗', 'cyan'));
  print(color('║                                                          ║', 'cyan'));
  print(color('║   ██████╗  █████╗ ██████╗ ██╗██████╗                     ║', 'cyan'));
  print(color('║   ██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗                    ║', 'cyan'));
  print(color('║   ██████╔╝███████║██████╔╝██║██║  ██║                    ║', 'cyan'));
  print(color('║   ██╔══██╗██╔══██║██╔═══╝ ██║██║  ██║                    ║', 'cyan'));
  print(color('║   ██║  ██║██║  ██║██║     ██║██████╔╝                    ║', 'cyan'));
  print(color('║   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝                     ║', 'cyan'));
  print(color('║                                                          ║', 'cyan'));
  print(color('║   Requirements · Architecture · Patterns                 ║', 'cyan'));
  print(color('║   Implementation · Delivery                              ║', 'cyan'));
  print(color('║                                                          ║', 'cyan'));
  print(color('╚══════════════════════════════════════════════════════════╝', 'cyan'));
  print('');
}

function printHelp() {
  print('');
  print(color('RAPID', 'bright') + ' - AI-assisted development methodology for Claude Code');
  print('');
  print(color('Usage:', 'yellow'));
  print('  npx rapid-method <command>');
  print('');
  print(color('Commands:', 'yellow'));
  print('  install     Install RAPID in current project');
  print('  help        Show this help message');
  print('');
  print(color('Example:', 'yellow'));
  print('  npx rapid-method install');
  print('');
}

async function ask(rl, question, defaultValue = '') {
  return new Promise((resolve) => {
    const defaultText = defaultValue ? color(` (${defaultValue})`, 'yellow') : '';
    rl.question(`${color('?', 'green')} ${question}${defaultText}: `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

async function askChoice(rl, question, options) {
  print(`\n${color('?', 'green')} ${question}`);
  options.forEach((opt, i) => {
    print(`  ${color(`[${i + 1}]`, 'cyan')} ${opt.label} - ${color(opt.description, 'yellow')}`);
  });

  return new Promise((resolve) => {
    rl.question(`${color('>', 'green')} Choose (1-${options.length}): `, (answer) => {
      const index = parseInt(answer) - 1;
      if (index >= 0 && index < options.length) {
        resolve(options[index].value);
      } else {
        resolve(options[0].value);
      }
    });
  });
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
  const targetDir = process.cwd();
  const templatesDir = path.join(__dirname, '..', 'templates');

  printHeader();

  print(color('Welcome to RAPID!', 'bright'));
  print('A lean AI-assisted development methodology for Claude Code.\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    // Collect user information
    print(color('── User Configuration ──', 'blue'));
    const userName = await ask(rl, 'Your name');

    const language = await askChoice(rl, 'Preferred communication language', [
      { label: 'English', description: 'AI communicates in English', value: 'English' },
      { label: 'Português', description: 'AI comunica em Português', value: 'Portuguese' },
      { label: 'Español', description: 'AI comunica en Español', value: 'Spanish' },
    ]);

    const skillLevel = await askChoice(rl, 'Your skill level', [
      { label: 'Beginner', description: 'More detailed explanations', value: 'beginner' },
      { label: 'Intermediate', description: 'Balanced explanations', value: 'intermediate' },
      { label: 'Advanced', description: 'Concise, technical responses', value: 'advanced' },
      { label: 'Expert', description: 'Minimal explanations', value: 'expert' },
    ]);

    // Project configuration
    print(color('\n── Project Configuration ──', 'blue'));
    const projectName = await ask(rl, 'Project name', path.basename(targetDir));

    print('\n' + color('Installing RAPID...', 'cyan'));

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

    // Create config.yaml with user settings
    const config = `# RAPID Methodology Configuration
# ================================

# Project
project_name: "${projectName}"
project_version: "1.0.0"

# User
user_name: "${userName}"
communication_language: "${language}"
document_language: "English"
user_skill_level: "${skillLevel}"

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

    print(color('\n✓ RAPID installed successfully!\n', 'green'));

    print(color('── Structure Created ──', 'blue'));
    print(`  ${color('_rapid/', 'cyan')}`);
    print(`    ├── config.yaml`);
    print(`    ├── templates/`);
    print(`    └── output/`);
    print(`  ${color('.claude/skills/', 'cyan')}`);
    print(`    ├── rapid-quick-dev/`);
    print(`    ├── rapid-create-prd/`);
    print(`    ├── rapid-create-context/`);
    print(`    ├── rapid-create-patterns/`);
    print(`    └── rapid-help/`);

    print(color('\n── Next Steps ──', 'blue'));
    print(`  1. ${color('rapid create-context', 'cyan')} - Document your project context`);
    print(`  2. ${color('rapid create-patterns', 'cyan')} - Define coding patterns`);
    print(`  3. ${color('rapid quick-dev "task"', 'cyan')} - Start developing!`);
    print('');

  } finally {
    rl.close();
  }
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
