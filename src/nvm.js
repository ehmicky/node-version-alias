import { execFile } from 'child_process'
import { join } from 'path'
import { env } from 'process'
import { promisify } from 'util'

import pathExists from 'path-exists'

const pExecFile = promisify(execFile)

// Retrieve nvm custom alias.
export const getNvmCustomAlias = function (alias) {
  return runNvmCommand(`nvm_alias ${alias}`)
}

// Retrieve Node.js version outside nvm
export const getNvmSystemVersion = function () {
  return runNvmCommand('nvm deactivate >/dev/null && node --version')
}

// nvm requires sourcing `nvm.sh` first
const runNvmCommand = async function (command) {
  if (!env.NVM_DIR) {
    return
  }

  const nvmPath = join(env.NVM_DIR, 'nvm.sh')

  if (await !pathExists(nvmPath)) {
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
