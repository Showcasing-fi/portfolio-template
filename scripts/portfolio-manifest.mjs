import { appendFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MANIFEST_PATH = new URL('../portfolio.manifest.json', import.meta.url);
const PLACEHOLDER_USERNAME = 'your-username';

export const USERNAME_PATTERN = /^(?=.{3,30}$)[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) {
  throw new Error(`Invalid portfolio.manifest.json: ${message}`);
}

function readManifestFile() {
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  } catch (error) {
    fail(`unable to read manifest. ${error.message}`);
  }
}

function requireNonEmptyString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(`${fieldName} must be a non-empty string.`);
  }

  return value.trim();
}

export function normalizeDeployPath(value) {
  const trimmed = requireNonEmptyString(value, 'deployPath');
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

  return withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

function normalizeOutputDir(value) {
  const trimmed = requireNonEmptyString(value, 'outputDir');
  const normalized = path.posix.normalize(trimmed.replace(/\\/g, '/'));

  if (
    normalized === '.' ||
    normalized.startsWith('../') ||
    normalized.includes('/../') ||
    path.posix.isAbsolute(normalized) ||
    path.win32.isAbsolute(trimmed)
  ) {
    fail('outputDir must be a safe relative directory inside the repository.');
  }

  return normalized.replace(/\/$/, '');
}

export function resolvePortfolioManifest(options = {}) {
  const { requireRealUsername = false } = options;
  const manifest = readManifestFile();
  const username = requireNonEmptyString(manifest.username, 'username');

  if (requireRealUsername && username === PLACEHOLDER_USERNAME) {
    fail(
      `username must be changed from the placeholder value "${PLACEHOLDER_USERNAME}" before deployment.`
    );
  }

  if (!USERNAME_PATTERN.test(username)) {
    fail(
      'username must match ^(?=.{3,30}$)[a-z0-9]+(?:-[a-z0-9]+)*$ and use only lowercase letters, numbers, and hyphens.'
    );
  }

  const deployPath = normalizeDeployPath(manifest.deployPath);
  const expectedDeployPath = `/${username}/`;

  if (deployPath !== expectedDeployPath) {
    fail(`deployPath must be exactly "${expectedDeployPath}" to match username "${username}".`);
  }

  const siteTitle = requireNonEmptyString(manifest.siteTitle, 'siteTitle');
  const outputDir = normalizeOutputDir(manifest.outputDir);
  const remoteDir = `/httpdocs/${username}/`;

  if (remoteDir === '/httpdocs//' || !/^\/httpdocs\/[a-z0-9-]+\/$/.test(remoteDir)) {
    fail(`computed remote directory "${remoteDir}" is malformed.`);
  }

  return {
    username,
    deployPath,
    expectedDeployPath,
    outputDir,
    remoteDir,
    siteTitle,
  };
}

function writeGitHubOutput(config) {
  const lines = [
    `username=${config.username}`,
    `deploy_path=${config.deployPath}`,
    `output_dir=${config.outputDir}`,
    `remote_dir=${config.remoteDir}`,
    `site_title=${config.siteTitle}`,
  ].join('\n');

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${lines}\n`);
    return;
  }

  process.stdout.write(`${lines}\n`);
}

function runCli() {
  try {
    const config = resolvePortfolioManifest({
      requireRealUsername: process.argv.includes('--require-real-username'),
    });

    if (process.argv.includes('--github-output')) {
      writeGitHubOutput(config);
      return;
    }

    process.stdout.write(`${JSON.stringify(config, null, 2)}\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  runCli();
}
