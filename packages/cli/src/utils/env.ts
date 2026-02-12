/**
 * Environment detection utilities
 */

/**
 * Detect if running in an AI agent or non-interactive environment
 * Returns true if we should skip interactive prompts
 */
export function isNonInteractive(): boolean {
  // Check for AI coding assistants
  if (isAIAgent()) {
    return true;
  }

  // Check for CI/CD environments
  if (isCI()) {
    return true;
  }

  // Check if stdin is not a TTY (piped input, etc.)
  if (!process.stdin.isTTY) {
    return true;
  }

  return false;
}

/**
 * Detect if running inside an AI coding assistant
 */
export function isAIAgent(): boolean {
  const env = process.env;

  // Claude Code
  if (env.CLAUDECODE === '1' || env.CLAUDE_CODE_ENTRYPOINT) {
    return true;
  }

  // Cursor IDE
  if (env.CURSOR_TRACE_ID || env.CURSOR_EDITOR) {
    return true;
  }

  // GitHub Copilot CLI
  if (env.GITHUB_COPILOT_CLI) {
    return true;
  }

  // Aider
  if (env.AIDER_MODEL || env.AIDER) {
    return true;
  }

  // Codeium / Windsurf
  if (env.CODEIUM_API_KEY || env.WINDSURF_EDITOR) {
    return true;
  }

  // Amazon CodeWhisperer / Amazon Q
  if (env.AWS_TOOLKIT_TELEMETRY_OPTOUT !== undefined && env.VSCODE_PID) {
    return true;
  }

  // Generic AI agent detection
  if (env.AI_AGENT || env.AI_ASSISTANT || env.CODING_AGENT) {
    return true;
  }

  return false;
}

/**
 * Detect if running in a CI/CD environment
 */
export function isCI(): boolean {
  const env = process.env;

  return !!(
    env.CI ||
    env.CONTINUOUS_INTEGRATION ||
    env.GITHUB_ACTIONS ||
    env.GITLAB_CI ||
    env.CIRCLECI ||
    env.TRAVIS ||
    env.JENKINS_URL ||
    env.BUILDKITE ||
    env.DRONE ||
    env.CODEBUILD_BUILD_ID ||
    env.TF_BUILD // Azure Pipelines
  );
}

/**
 * Get the name of the detected AI agent (for logging)
 */
export function getAgentName(): string | null {
  const env = process.env;

  if (env.CLAUDECODE === '1' || env.CLAUDE_CODE_ENTRYPOINT) {
    return 'Claude Code';
  }
  if (env.CURSOR_TRACE_ID || env.CURSOR_EDITOR) {
    return 'Cursor';
  }
  if (env.GITHUB_COPILOT_CLI) {
    return 'GitHub Copilot';
  }
  if (env.AIDER_MODEL || env.AIDER) {
    return 'Aider';
  }
  if (env.CODEIUM_API_KEY || env.WINDSURF_EDITOR) {
    return 'Windsurf/Codeium';
  }

  return null;
}
