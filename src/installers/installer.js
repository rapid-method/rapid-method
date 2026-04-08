const fs = require('fs');
const path = require('path');
const { copyDir, smartCopy } = require('../lib/file-ops');
const { transformSkillForPlatform, getTargetDir, getPlatforms } = require('../lib/platforms');
const { generate: generateManifest, loadFilesManifest } = require('./manifest');
const { detect } = require('./detector');

/**
 * Core installer — handles fresh installs and updates.
 */
class Installer {
  constructor(options) {
    this.targetDir = options.targetDir;
    this.templatesDir = options.templatesDir;
    this.userName = options.userName;
    this.communicationLanguage = options.communicationLanguage;
    this.documentLanguage = options.documentLanguage;
    this.projectName = options.projectName;
    this.selectedPlatforms = options.selectedPlatforms || [];
    this.version = options.version;

    this.rapidDir = path.join(this.targetDir, '_rapid');
    this.existingInstall = null;
    this.existingFilesManifest = null;
    this.installedPlatforms = [];
    this.stats = { new: 0, updated: 0, unchanged: 0, backed_up: 0 };
  }

  /**
   * Run full installation
   */
  install() {
    this.existingInstall = detect(this.targetDir);
    this.existingFilesManifest = loadFilesManifest(this.targetDir);

    this._createDirectories();
    this._installTemplates();
    this._installSkills();
    this._writeConfig();
    this._generateManifest();

    return {
      installedPlatforms: this.installedPlatforms,
      stats: this.stats,
      isUpdate: this.existingInstall.installed,
    };
  }

  /**
   * Quick update — preserves user config, only updates templates and skills
   */
  quickUpdate() {
    this.existingInstall = detect(this.targetDir);
    this.existingFilesManifest = loadFilesManifest(this.targetDir);

    if (!this.existingInstall.installed) {
      throw new Error('No existing installation found. Run a full install first.');
    }

    // Use existing config values
    const cfg = this.existingInstall.config;
    this.userName = cfg.user_name || this.userName;
    this.communicationLanguage = cfg.communication_language || this.communicationLanguage;
    this.documentLanguage = cfg.document_language || this.documentLanguage;
    this.projectName = cfg.project_name || this.projectName;
    this.selectedPlatforms = cfg.platforms || this.selectedPlatforms;

    this._installTemplates();
    this._installSkills();
    this._generateManifest();

    return {
      installedPlatforms: this.installedPlatforms,
      stats: this.stats,
      isUpdate: true,
    };
  }

  // -- Private methods --

  _createDirectories() {
    fs.mkdirSync(this.rapidDir, { recursive: true });
    fs.mkdirSync(path.join(this.rapidDir, 'output', 'briefs'), { recursive: true });
    fs.mkdirSync(path.join(this.rapidDir, 'output', 'prds'), { recursive: true });
    fs.mkdirSync(path.join(this.rapidDir, 'output', 'specs'), { recursive: true });
    fs.mkdirSync(path.join(this.rapidDir, 'templates'), { recursive: true });
  }

  _installTemplates() {
    const rapidTemplatesDir = path.join(this.templatesDir, 'rapid', 'templates');
    if (!fs.existsSync(rapidTemplatesDir)) return;

    const destTemplatesDir = path.join(this.rapidDir, 'templates');
    fs.mkdirSync(destTemplatesDir, { recursive: true });

    const entries = fs.readdirSync(rapidTemplatesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const srcFile = path.join(rapidTemplatesDir, entry.name);
      const destFile = path.join(destTemplatesDir, entry.name);
      const manifestHash = this._getManifestHash(path.relative(this.targetDir, destFile));
      const result = smartCopy(srcFile, destFile, manifestHash);
      this._trackStat(result.status);
    }
  }

  _installSkills() {
    const skillsTemplatesDir = path.join(this.templatesDir, 'skills');
    if (!fs.existsSync(skillsTemplatesDir)) return;

    const platforms = getPlatforms();

    for (const platformCode of this.selectedPlatforms) {
      const targetSkillsDir = getTargetDir(platformCode);
      if (!targetSkillsDir) continue;

      const fullTargetDir = path.join(this.targetDir, targetSkillsDir);
      fs.mkdirSync(fullTargetDir, { recursive: true });

      const skillFolders = fs.readdirSync(skillsTemplatesDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

      for (const skillFolder of skillFolders) {
        const srcSkillDir = path.join(skillsTemplatesDir, skillFolder);
        const destSkillDir = path.join(fullTargetDir, skillFolder);
        this._installSkillDir(srcSkillDir, destSkillDir, skillFolder, platformCode);
      }

      this.installedPlatforms.push({
        code: platformCode,
        dir: targetSkillsDir,
        name: platforms[platformCode]?.name || platformCode,
      });
    }
  }

  _installSkillDir(srcDir, destDir, skillFolder, platformCode) {
    fs.mkdirSync(destDir, { recursive: true });

    const entries = fs.readdirSync(srcDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isFile()) {
        const srcFile = path.join(srcDir, entry.name);
        const destFile = path.join(destDir, entry.name);

        if (entry.name === 'SKILL.md') {
          // Transform SKILL.md for the platform
          const content = fs.readFileSync(srcFile, 'utf-8');
          const transformed = transformSkillForPlatform(content, skillFolder, platformCode);
          const manifestHash = this._getManifestHash(path.relative(this.targetDir, destFile));

          if (fs.existsSync(destFile)) {
            const { getFileHash } = require('../lib/file-ops');
            const destHash = getFileHash(destFile);
            if (manifestHash && destHash !== manifestHash) {
              // User modified — backup
              fs.copyFileSync(destFile, destFile + '.bak');
              this.stats.backed_up++;
            }
          }

          fs.writeFileSync(destFile, transformed);
          this.stats[fs.existsSync(destFile) ? 'updated' : 'new']++;
        } else {
          const manifestHash = this._getManifestHash(path.relative(this.targetDir, destFile));
          const result = smartCopy(srcFile, destFile, manifestHash);
          this._trackStat(result.status);
        }
      } else if (entry.isDirectory()) {
        // Recursively copy subdirectories (prompts, resources, etc.)
        const srcSubDir = path.join(srcDir, entry.name);
        const destSubDir = path.join(destDir, entry.name);
        copyDir(srcSubDir, destSubDir);
      }
    }
  }

  _writeConfig() {
    const platformsList = this.selectedPlatforms.map(p => `  - ${p}`).join('\n');
    const config = `# RAPID Methodology Configuration
# ================================

# Project
project_name: "${this.projectName}"
project_version: "1.0.0"

# User
user_name: "${this.userName}"
communication_language: "${this.communicationLanguage}"
document_language: "${this.documentLanguage}"

# Installed Platforms
platforms:
${platformsList || '  # none'}

# Paths
output_folder: "{project-root}/_rapid/output"
briefs_folder: "{project-root}/_rapid/output/briefs"
prds_folder: "{project-root}/_rapid/output/prds"
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

    fs.writeFileSync(path.join(this.rapidDir, 'config.yaml'), config);
  }

  _generateManifest() {
    generateManifest(this.targetDir, {
      version: this.version,
      platforms: this.selectedPlatforms,
      projectName: this.projectName,
      installedPlatforms: this.installedPlatforms,
    });
  }

  _getManifestHash(relPath) {
    if (!this.existingFilesManifest?.files) return null;
    const entry = this.existingFilesManifest.files[relPath];
    return entry?.hash || null;
  }

  _trackStat(status) {
    if (status === 'user-modified') {
      this.stats.backed_up++;
      this.stats.updated++;
    } else if (this.stats[status] !== undefined) {
      this.stats[status]++;
    }
  }
}

module.exports = { Installer };
