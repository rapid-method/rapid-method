const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const { print, printDiv, printHeader, printSummaryBox, color, bar, finishBar } = require('../lib/ui');
const { getPlatforms } = require('../lib/platforms');
const { detect } = require('../installers/detector');
const { Installer } = require('../installers/installer');

function getSystemUserName() {
  return process.env.USER || process.env.USERNAME || process.env.LOGNAME || '';
}

/**
 * Install command — handles fresh installs and updates
 */
async function run(options) {
  const templatesDir = path.join(__dirname, '..', '..', 'templates');

  printHeader(options.version);
  printDiv();
  print(bar);

  const onCancel = () => {
    print(bar);
    print(`${finishBar}  ${color('Installation cancelled.', 'red')}`);
    process.exit(0);
  };

  // -- Target directory --
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

  // -- Detect existing installation --
  const existing = detect(targetDir);

  if (existing.installed) {
    print(`${color('●', 'yellow')}  Existing RAPID installation detected`);
    if (existing.config?.project_name) {
      print(`${bar}  Project: ${color(existing.config.project_name, 'cyan')}`);
    }
    print(bar);

    const { updateAction } = await prompts({
      type: 'select',
      name: 'updateAction',
      message: 'What would you like to do?',
      choices: [
        { title: 'Quick update', value: 'quick', description: 'Update templates & skills, keep your config' },
        { title: 'Full reinstall', value: 'full', description: 'Reconfigure everything from scratch' },
        { title: 'Cancel', value: 'cancel' },
      ],
    }, { onCancel });

    if (updateAction === 'cancel') {
      print(bar);
      print(color('Installation cancelled.', 'yellow'));
      return;
    }

    if (updateAction === 'quick') {
      print(bar);
      printDiv();
      print(bar);
      print(`${color('●', 'blue')}  Updating RAPID...`);

      const installer = new Installer({
        targetDir,
        templatesDir,
        version: options.version,
        selectedPlatforms: existing.config.platforms || [],
        projectName: existing.config.project_name,
      });

      const result = installer.quickUpdate();

      print(`${bar}  Updated ${color('_rapid/', 'cyan')}`);
      _printStats(result.stats);

      for (const platform of result.installedPlatforms) {
        print(`${bar}  Updated ${color(platform.dir + '/', 'cyan')} (${platform.name})`);
      }

      print(bar);
      printDiv();
      print(bar);

      printSummaryBox(targetDir, result.installedPlatforms, getPlatforms());
      return;
    }

    // Full reinstall — continue below
  }

  // -- Confirm installation --
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

  // -- Configuration --
  print(color('◆', 'magenta') + color('  Configuring RAPID Core', 'bright'));
  print(bar);

  const defaultUserName = getSystemUserName();

  const { userName } = await prompts({
    type: 'text',
    name: 'userName',
    message: 'What should agents call you?',
    initial: existing.installed ? existing.config?.user_name || defaultUserName : defaultUserName,
  }, { onCancel });

  print(bar);

  const { communicationLanguage } = await prompts({
    type: 'text',
    name: 'communicationLanguage',
    message: 'What language should agents use when chatting with you?',
    initial: existing.installed ? existing.config?.communication_language || 'English' : 'English',
  }, { onCancel });

  print(bar);

  const { documentLanguage } = await prompts({
    type: 'text',
    name: 'documentLanguage',
    message: 'Preferred document output language?',
    initial: existing.installed ? existing.config?.document_language || 'English' : 'English',
  }, { onCancel });

  print(bar);

  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'Project name?',
    initial: existing.installed ? existing.config?.project_name || path.basename(targetDir) : path.basename(targetDir),
  }, { onCancel });

  print(bar);
  printDiv();
  print(bar);

  // -- Platform selection --
  print(color('◆', 'magenta') + color('  Select AI Platforms', 'bright'));
  print(bar);

  const platforms = getPlatforms();
  const existingPlatforms = existing.installed ? existing.config?.platforms || [] : [];

  const platformChoices = Object.entries(platforms).map(([code, platform]) => ({
    title: platform.name,
    value: code,
    description: platform.description,
    selected: existingPlatforms.includes(code),
  }));

  let selectedPlatforms = await promptPlatformSelection(platformChoices, onCancel);

  print(bar);
  printDiv();
  print(bar);

  // -- Run installation --
  print(`${color('●', 'blue')}  Installing RAPID...`);

  const installer = new Installer({
    targetDir,
    templatesDir,
    userName,
    communicationLanguage,
    documentLanguage,
    projectName,
    selectedPlatforms,
    version: options.version,
  });

  const result = installer.install();

  print(`${bar}  Created ${color('_rapid/', 'cyan')}`);
  _printStats(result.stats);

  for (const platform of result.installedPlatforms) {
    print(`${bar}  Created ${color(platform.dir + '/', 'cyan')} (${platform.name})`);
  }

  print(bar);
  printDiv();
  print(bar);

  printSummaryBox(targetDir, result.installedPlatforms, platforms);
}

async function promptPlatformSelection(choices, onCancel) {
  const { selected } = await prompts({
    type: 'multiselect',
    name: 'selected',
    message: 'Which AI platforms do you want to use?',
    choices: choices,
    hint: '- Space to select. Return to submit'
  }, { onCancel });

  if (!selected || selected.length === 0) {
    const { confirmNoTools } = await prompts({
      type: 'toggle',
      name: 'confirmNoTools',
      message: 'No platforms selected. Continue without installing skills?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    }, { onCancel });

    if (!confirmNoTools) {
      print(bar);
      return promptPlatformSelection(choices, onCancel);
    }

    return [];
  }

  return selected;
}

function _printStats(stats) {
  if (stats.backed_up > 0) {
    print(`${bar}  ${color('⚠', 'yellow')}  ${stats.backed_up} user-modified file(s) backed up as .bak`);
  }
}

module.exports = { run };
