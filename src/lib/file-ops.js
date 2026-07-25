const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Recursively copy a directory
 */
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

/**
 * Get SHA256 hash of a file
 */
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * List all files in a directory recursively (relative paths)
 */
function getFileList(dir, basePath) {
  basePath = basePath || dir;
  const results = [];

  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getFileList(fullPath, basePath));
    } else {
      results.push(path.relative(basePath, fullPath));
    }
  }

  return results;
}

/**
 * Smart copy: copies file only if source hash differs from dest hash.
 * Returns 'new', 'updated', 'unchanged', or 'user-modified' (if dest was modified by user).
 */
function smartCopy(srcFile, destFile, manifestHash) {
  const srcHash = getFileHash(srcFile);

  if (!fs.existsSync(destFile)) {
    const destDir = path.dirname(destFile);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(srcFile, destFile);
    return { status: 'new', hash: srcHash };
  }

  const destHash = getFileHash(destFile);

  // If dest matches source, nothing to do
  if (srcHash === destHash) {
    return { status: 'unchanged', hash: srcHash };
  }

  // If we have a manifest hash and dest doesn't match it, user modified the file
  if (manifestHash && destHash !== manifestHash) {
    // User modified — backup and copy
    const backupPath = destFile + '.bak';
    fs.copyFileSync(destFile, backupPath);
    fs.copyFileSync(srcFile, destFile);
    return { status: 'user-modified', hash: srcHash, backup: backupPath };
  }

  // Dest matches manifest (or no manifest) — safe to overwrite
  fs.copyFileSync(srcFile, destFile);
  return { status: 'updated', hash: srcHash };
}

module.exports = {
  copyDir,
  getFileHash,
  getFileList,
  smartCopy,
};
