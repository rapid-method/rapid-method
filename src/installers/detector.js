const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

/**
 * Detect an existing RAPID installation in the target directory.
 *
 * Returns:
 *   { installed: false } — no installation found
 *   { installed: true, version, config, manifest, platforms } — existing install
 */
function detect(targetDir) {
  const rapidDir = path.join(targetDir, '_rapid');
  const configPath = path.join(rapidDir, 'config.yaml');

  if (!fs.existsSync(configPath)) {
    return { installed: false };
  }

  let config = {};
  try {
    config = yaml.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch {
    return { installed: false };
  }

  // Read manifest if available
  const manifestPath = path.join(rapidDir, 'manifest.yaml');
  let manifest = null;
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = yaml.parse(fs.readFileSync(manifestPath, 'utf-8'));
    } catch {}
  }

  // Read files manifest for hash tracking
  const filesManifestPath = path.join(rapidDir, 'files-manifest.yaml');
  let filesManifest = null;
  if (fs.existsSync(filesManifestPath)) {
    try {
      filesManifest = yaml.parse(fs.readFileSync(filesManifestPath, 'utf-8'));
    } catch {}
  }

  return {
    installed: true,
    version: config.project_version || manifest?.version || 'unknown',
    config,
    manifest,
    filesManifest,
    platforms: config.platforms || [],
  };
}

module.exports = { detect };
