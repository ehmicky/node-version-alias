import { execFile } from 'node:child_process'
import { join } from 'node:path'
import { env } from 'node:process'
import { promisify } from 'node:util'

import { pathExists } from 'path-exists'

const pExecFile = promisify(execFile)

// Retrieve nvm custom alias.
export const getNvmCustomAlias = (alias) => runNvmCommand(`nvm_alias ${alias}`)

// Retrieve Node.js version outside nvm
export const getNvmSystemVersion = () =>
  runNvmCommand('nvm deactivate >/dev/null && node --version')

// nvm requires sourcing `nvm.sh` first
const runNvmCommand = async (command) => {
  if (!env.NVM_DIR) {
    return
  }

  const nvmPath = join(env.NVM_DIR, 'nvm.sh')

  if (!(await pathExists(nvmPath))) {
    return
  }

  try {
    const { stdout } = await pExecFile('bash', [
      '-c',
      `source "${nvmPath}" && ${command}`,
    ])
    return stdout.trim()
    // Among possible errors:
    //   - Setup issue: Bash or nvm not installed, Bash setup error, etc.
    //   - Custom alias: alias does not exist
    //   - `system`: no system `node` outside `nvm`
  } catch {}
}
