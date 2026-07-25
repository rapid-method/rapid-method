const path = require('fs');

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

function printDiv() {
  const width = process.stdout.columns || 80;
  const boxWidth = width - 3;
  const prefix = bar + '  ';
  print(prefix + div.repeat(boxWidth));
}

function printHeader(version) {
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

  const versionLabel = ` v${version} `;
  const leftEquals = 2;
  const rightEquals = Math.max(0, boxWidth - 2 - leftEquals - versionLabel.length);
  print(prefix + color('╔' + '═'.repeat(leftEquals) + versionLabel + '═'.repeat(rightEquals) + '╗', 'blue'));

  print(prefix + fillLine('', boxWidth));

  for (const line of logo) {
    const centered = centerPad(line, boxWidth - 2);
    print(prefix + color('║', 'blue') + color(centered, 'blue') + ' '.repeat(Math.max(0, boxWidth - 2 - centered.length)) + color('║', 'blue'));
  }

  print(prefix + fillLine('', boxWidth));

  const taglineCentered = centerPad(tagline, boxWidth - 2);
  print(prefix + color('║', 'blue') + color(taglineCentered, 'dim') + ' '.repeat(Math.max(0, boxWidth - 2 - taglineCentered.length)) + color('║', 'blue'));

  print(prefix + fillLine('', boxWidth));

  print(prefix + color('╚' + '═'.repeat(boxWidth - 2) + '╝', 'blue'));

  print(bar);
}

function printSummaryBox(targetDir, installedPlatforms, platforms) {
  const width = process.stdout.columns || 80;
  const boxWidth = Math.min(width - 5, 118);
  const innerWidth = boxWidth - 35;

  const truncate = (str, max) => str.length > max ? str.slice(0, max - 3) + '...' : str;

  const displayDir = truncate(targetDir, innerWidth - 17);
  const ghUrl = 'https://github.com/rapid-method/rapid-method';
  const displayUrl = truncate(ghUrl, innerWidth - 23);
  const skillLine = truncate('Invoke the rapid-help skill in your AI agent to get started', innerWidth - 5);

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

module.exports = {
  COLORS,
  bar,
  finishBar,
  div,
  color,
  print,
  printDiv,
  printHeader,
  printSummaryBox,
};
