import { spawn } from 'child_process';
import type { ProjectInfo } from '../types/index.js';

/**
 * Install dependencies using the detected package manager
 */
export async function installDependencies(
  cwd: string,
  packages: string[],
  options: {
    packageManager: ProjectInfo['packageManager'];
    dev?: boolean;
  }
): Promise<void> {
  if (packages.length === 0) return;

  const { packageManager, dev = false } = options;

  const command = getInstallCommand(packageManager, packages, dev);

  return new Promise((resolve, reject) => {
    const child = spawn(command.cmd, command.args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Installation failed with code ${code}`));
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Get the install command for a package manager
 */
function getInstallCommand(
  packageManager: ProjectInfo['packageManager'],
  packages: string[],
  dev: boolean
): { cmd: string; args: string[] } {
  const devFlag = {
    bun: dev ? '-d' : '',
    npm: dev ? '--save-dev' : '',
    pnpm: dev ? '-D' : '',
    yarn: dev ? '-D' : '',
  };

  switch (packageManager) {
    case 'bun':
      return {
        cmd: 'bun',
        args: ['add', devFlag.bun, ...packages].filter(Boolean),
      };
    case 'pnpm':
      return {
        cmd: 'pnpm',
        args: ['add', devFlag.pnpm, ...packages].filter(Boolean),
      };
    case 'yarn':
      return {
        cmd: 'yarn',
        args: ['add', devFlag.yarn, ...packages].filter(Boolean),
      };
    case 'npm':
    default:
      return {
        cmd: 'npm',
        args: ['install', devFlag.npm, ...packages].filter(Boolean),
      };
  }
}

/**
 * Run a package manager command
 */
export async function runPackageManagerCommand(
  cwd: string,
  packageManager: ProjectInfo['packageManager'],
  args: string[]
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}
