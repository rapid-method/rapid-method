const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

/**
 * Load platform configuration from YAML file
 */
function loadPlatformConfig() {
  const configPath = path.join(__dirname, 'platform-codes.yaml');
  const content = fs.readFileSync(configPath, 'utf-8');
  return yaml.parse(content);
}

/**
 * Get all available platforms
 */
function getPlatforms() {
  const config = loadPlatformConfig();
  return config.platforms;
}

/**
 * Get preferred platforms (recommended for users)
 */
function getPreferredPlatforms() {
  const platforms = getPlatforms();
  return Object.entries(platforms)
    .filter(([_, p]) => p.preferred)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

/**
 * Get platform by code
 */
function getPlatform(code) {
  const platforms = getPlatforms();
  return platforms[code] || null;
}

/**
 * Get target directory for a platform
 */
function getTargetDir(platformCode) {
  const platform = getPlatform(platformCode);
  if (!platform || !platform.installer) {
    return null;
  }
  return platform.installer.target_dir;
}

/**
 * Get template type for a platform
 */
function getTemplateType(platformCode) {
  const platform = getPlatform(platformCode);
  if (!platform || !platform.installer) {
    return 'default';
  }
  return platform.installer.template_type || 'default';
}

/**
 * Load a template by type
 */
function loadTemplate(templateType) {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateType}.md`);
  if (!fs.existsSync(templatePath)) {
    // Fallback to default template
    const defaultPath = path.join(__dirname, '..', 'templates', 'default.md');
    return fs.readFileSync(defaultPath, 'utf-8');
  }
  return fs.readFileSync(templatePath, 'utf-8');
}

/**
 * Render a template with variables
 */
function renderTemplate(template, variables) {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
}

/**
 * Transform skill content for a specific platform
 */
function transformSkillForPlatform(skillContent, skillName, platformCode) {
  const templateType = getTemplateType(platformCode);
  const template = loadTemplate(templateType);

  // Extract name and description from skill content
  const lines = skillContent.split('\n');
  const titleLine = lines.find(l => l.startsWith('# '));
  const name = titleLine ? titleLine.replace('# ', '').trim() : skillName;

  // Find description (first non-empty line after title)
  let description = '';
  let foundTitle = false;
  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    if (foundTitle && line.trim()) {
      description = line.trim();
      break;
    }
  }

  // For default template, return original content with frontmatter
  if (templateType === 'default') {
    return renderTemplate(template, {
      name,
      description,
      content: skillContent
    });
  }

  // For other templates, wrap the content
  return renderTemplate(template, {
    name,
    description,
    content: skillContent
  });
}

/**
 * Get platform choices for prompts
 */
function getPlatformChoices() {
  const platforms = getPlatforms();
  const preferred = [];
  const others = [];

  for (const [code, platform] of Object.entries(platforms)) {
    const choice = {
      title: platform.name,
      value: code,
      description: platform.description
    };

    if (platform.preferred) {
      preferred.push(choice);
    } else {
      others.push(choice);
    }
  }

  return [...preferred, ...others];
}

module.exports = {
  loadPlatformConfig,
  getPlatforms,
  getPreferredPlatforms,
  getPlatform,
  getTargetDir,
  getTemplateType,
  loadTemplate,
  renderTemplate,
  transformSkillForPlatform,
  getPlatformChoices
};
