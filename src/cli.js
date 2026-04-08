#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ============================================================================
// Prompt UI Customizations (clack-style)
// ============================================================================

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

// Customize multiselect prompt: clack-style
try {
  const MultiselectPrompt = require('prompts/lib/elements/multiselect');
  const { cursor: ansiCursor, erase: ansiErase } = require('sisteransi');
  const clearPrompt = require('prompts/lib/util/clear');

  MultiselectPrompt.prototype.render = function () {
    if (this.closed) return;
    if (this.firstRender) this.out.write(ansiCursor.hide);
    else this.out.write(clearPrompt(this.outputText, this.out.columns));
    if (this.firstRender) this.firstRender = false;

    if (this.done || this.aborted) {
      const sym = this.aborted ? '\x1b[31m■\x1b[0m' : '\x1b[36m◇\x1b[0m';
      const selected = this.value.filter(v => v.selected).map(v => v.title).join(', ');
      this.outputText = `${sym}  ${this.msg}\n│  ${selected || 'None selected'}`;
    } else {
      let lines = [`\x1b[36m◆\x1b[0m  ${this.msg}`, `│  \x1b[2m(Space to select, Enter to confirm)\x1b[0m`];
      for (let i = 0; i < this.value.length; i++) {
        const v = this.value[i];
        const selected = v.selected ? '\x1b[32m◼\x1b[0m' : '\x1b[2m◻\x1b[0m';
        const cursor = i === this.cursor ? '\x1b[36m>\x1b[0m ' : '  ';
        const hint = v.description ? ` \x1b[2m- ${v.description}\x1b[0m` : '';
        lines.push(`│  ${cursor}${selected} ${v.title}${hint}`);
      }
      lines.push('└');
      this.outputText = lines.join('\n');
    }

    this.out.write(ansiErase.line + ansiCursor.to(0) + this.outputText);
  };
} catch {}

// ============================================================================
// CLI Entry Point
// ============================================================================

function getVersion() {
  try {
    const pkgPath = path.join(__dirname, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    return pkg.version;
  } catch {
    return '1.0.0';
  }
}

const args = process.argv.slice(2);
const command = args[0];
const version = getVersion();

switch (command) {
  case 'install':
    require('./commands/install').run({ version }).catch(console.error);
    break;
  case 'help':
  case '--help':
  case '-h':
    require('./commands/help').run();
    break;
  default:
    if (command) {
      const { color } = require('./lib/ui');
      console.log(color(`Unknown command: ${command}`, 'red'));
    }
    require('./commands/help').run();
    process.exit(command ? 1 : 0);
}
