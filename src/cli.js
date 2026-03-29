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

// Customize toggle prompt: clack-style with │ prefix and └ at bottom while active
try {
  const TogglePrompt = require('prompts/lib/elements/toggle');
  const { cursor: ansiCursor, erase: ansiErase } = require('sisteransi');
  const clearPrompt = require('prompts/lib/util/clear');

  TogglePrompt.prototype.render = function () {
    if (this.closed) return;
    if (this.firstRender) this.out.write(ansiCursor.hide);
    else this.out.write(clearPrompt(this.outputText, this.out.columns));
    if (this.firstRender) this.firstRender = false;

    if (this.done || this.aborted) {
      const sym = this.aborted ? '\x1b[31m■\x1b[0m' : '\x1b[36m◇\x1b[0m';
      const answer = this.value ? this.active : this.inactive;
      this.outputText = `${sym}  ${this.msg}\n│  ${answer}`;
    } else {
      const activeOpt = this.value
        ? `\x1b[32m●\x1b[0m ${this.active}`
        : `\x1b[2m○\x1b[0m ${this.active}`;
      const inactiveOpt = this.value
        ? `\x1b[2m○\x1b[0m ${this.inactive}`
        : `\x1b[32m●\x1b[0m ${this.inactive}`;
      this.outputText = `\x1b[36m◆\x1b[0m  ${this.msg}\n│  ${activeOpt} / ${inactiveOpt}\n└`;
    }

    this.out.write(ansiErase.line + ansiCursor.to(0) + this.outputText);
  };

  // Fix arrow keys: left selects the left option (active), right selects the right option (inactive)
  const origLeft = TogglePrompt.prototype.left;
  const origRight = TogglePrompt.prototype.right;
  TogglePrompt.prototype.left = origRight;
  TogglePrompt.prototype.right = origLeft;
} catch {}

// Customize text prompt: clack-style with multi-line layout
try {
  const TextPrompt = require('prompts/lib/elements/text');
  const { cursor: ansiCursor, erase: ansiErase } = require('sisteransi');
  const clearPrompt = require('prompts/lib/util/clear');

  TextPrompt.prototype.render = function () {
    if (this.closed) return;
    if (this.firstRender) this.out.write(ansiCursor.hide);
    else this.out.write(clearPrompt(this.outputText, this.out.columns));
    if (this.firstRender) this.firstRender = false;

    if (this.done || this.aborted) {
      const sym = this.aborted ? '\x1b[31m■\x1b[0m' : '\x1b[36m◇\x1b[0m';
      this.outputText = `${sym}  ${this.msg}\n│  ${this.value}`;
    } else {
      let display;
      if (this.value.length > 0) {
        const before = this.value.slice(0, this.cursor);
        const char = this.cursor < this.value.length ? this.value[this.cursor] : ' ';
        const after = this.cursor < this.value.length ? this.value.slice(this.cursor + 1) : '';
        display = `${before}\x1b[7m${char}\x1b[27m${after}`;
      } else if (this.initial) {
        display = `\x1b[7m \x1b[27m\x1b[2m${this.initial}\x1b[0m`;
      } else {
        display = '\x1b[7m \x1b[27m';
      }
      this.outputText = `\x1b[36m◆\x1b[0m  ${this.msg}\n│  ${display}\n│`;
    }

    this.out.write(ansiErase.line + ansiCursor.to(0) + this.outputText);
  };
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
  gray: '\x1b[90m',
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

  print(bar);

  const { communicationLanguage } = await prompts({
    type: 'text',
    name: 'communicationLanguage',
    message: 'What language should agents use when chatting with you?',
    initial: 'English',
  }, { onCancel });

  print(bar);

  const { documentLanguage } = await prompts({
    type: 'text',
    name: 'documentLanguage',
    message: 'Preferred document output language?',
    initial: 'English',
  }, { onCancel });

  print(bar);

  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'Project name?',
    initial: path.basename(targetDir),
  }, { onCancel });

  print(bar);
  printDiv();
  print(bar);

  print(`${color('●', 'blue')}  Installing RAPID...`);

  // Create directories
  const rapidDir = path.join(targetDir, '_rapid');
  const skillsDir = path.join(targetDir, '.claude', 'skills');

  fs.mkdirSync(rapidDir, { recursive: true });
  fs.mkdirSync(path.join(rapidDir, 'output', 'briefs'), { recursive: true });
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
briefs_folder: "{project-root}/_rapid/output/briefs"
specs_folder: "{project-root}/_rapid/output/specs"
project_architecture: "{project-root}/_rapid/project-architecture.md"
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

  print(`${bar}  Created ${color('_rapid/', 'cyan')}`);
  print(`${bar}  Created ${color('.claude/skills/', 'cyan')}`);
  
  print(bar);
  printDiv();
  print(bar);

  // Final summary box — cap visible line at 88 chars (overhead: line = boxWidth - 30)
  const width = process.stdout.columns || 80;
  const boxWidth = Math.min(width - 5, 118);
  const innerWidth = boxWidth - 35;

  const truncate = (str, max) => str.length > max ? str.slice(0, max - 3) + '...' : str;

  const displayDir = truncate(targetDir, innerWidth - 17);
  const ghUrl = 'https://github.com/rapid-method/rapid-method';
  const displayUrl = truncate(ghUrl, innerWidth - 23);
  const skillLine = truncate(`Invoke the rapid-help skill in your IDE Agent to get started`, innerWidth - 5);

  const pad = (contentLen) => ' '.repeat(Math.max(0, innerWidth - contentLen));

  const grayBar = color(bar, 'gray');

  print(`${color('◇', 'green')}  ${color('╭─', 'gray')} RAPID is ready to use! ${color('─', 'gray').repeat(Math.max(0, boxWidth - 60))}${color('╮', 'gray')}`);
  print(`${bar}  ${grayBar}${' '.repeat(innerWidth)}${grayBar}`);
  print(`${bar}  ${grayBar}  ${color('Installed to:', 'gray')} ${color(displayDir, 'cyan')}${pad(16 + displayDir.length)}${grayBar}`);
  print(`${bar}  ${grayBar}${' '.repeat(innerWidth)}${grayBar}`);
  print(`${bar}  ${grayBar}  ${color('Next steps:', 'gray')}${pad(13)}${grayBar}`);
  print(`${bar}  ${grayBar}    ${color('Star us on GitHub:', 'gray')} ${color(displayUrl, 'cyan')}${pad(23 + displayUrl.length)}${grayBar}`);
  print(`${bar}  ${grayBar}    ${color(skillLine, 'gray')}${pad(4 + skillLine.length)}${grayBar}`);
  print(`${bar}  ${grayBar}${' '.repeat(innerWidth)}${grayBar}`);
  print(`${bar}  ${color('╰', 'gray')}${color('─', 'gray').repeat(innerWidth)}${color('╯', 'gray')}`);
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
