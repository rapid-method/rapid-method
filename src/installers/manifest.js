const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const { getFileHash, getFileList } = require('../lib/file-ops');

/**
 * Generate manifest files after installation.
 *
 * Creates:
 *   _rapid/manifest.yaml       — Main manifest (version, platforms, date)
 *   _rapid/files-manifest.yaml — All installed files with SHA256 hashes
 */
function generate(targetDir, options) {
  const rapidDir = path.join(targetDir, '_rapid');
  const now = new Date().toISOString();

  // Main manifest
  const manifest = {
    version: options.version,
    installed: now,
    updated: now,
    platforms: options.platforms || [],
    project_name: options.projectName,
  };

  fs.writeFileSync(
    path.join(rapidDir, 'manifest.yaml'),
    yaml.stringify(manifest)
  );

  // Files manifest — tracks all installed files with hashes for safe updates
  const filesManifest = { generated: now, files: {} };

  // Track _rapid/ files
  const rapidFiles = getFileList(rapidDir, targetDir);
  for (const relPath of rapidFiles) {
    // Skip the manifest files themselves
    if (relPath.endsWith('manifest.yaml')) continue;
    const fullPath = path.join(targetDir, relPath);
    filesManifest.files[relPath] = {
      hash: getFileHash(fullPath),
      type: classifyFile(relPath),
    };
  }

  // Track platform skill files
  for (const platform of (options.installedPlatforms || [])) {
    const platformDir = path.join(targetDir, platform.dir);
    if (!fs.existsSync(platformDir)) continue;

    const platformFiles = getFileList(platformDir, targetDir);
    for (const relPath of platformFiles) {
      const fullPath = path.join(targetDir, relPath);
      filesManifest.files[relPath] = {
        hash: getFileHash(fullPath),
        type: 'skill',
      };
    }
  }

  fs.writeFileSync(
    path.join(rapidDir, 'files-manifest.yaml'),
    yaml.stringify(filesManifest)
  );

  return { manifest, filesManifest };
}

/**
 * Load existing files manifest for update comparison
 */
function loadFilesManifest(targetDir) {
  const manifestPath = path.join(targetDir, '_rapid', 'files-manifest.yaml');
  if (!fs.existsSync(manifestPath)) return null;

  try {
    return yaml.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } catch {
    return null;
  }
}

/**
 * Classify a file by its relative path
 */
function classifyFile(relPath) {
  if (relPath.includes('templates')) return 'template';
  if (relPath.endsWith('config.yaml')) return 'config';
  if (relPath.includes('output')) return 'output';
  if (relPath.includes('prompts')) return 'prompt';
  return 'core';
}

module.exports = { generate, loadFilesManifest };
