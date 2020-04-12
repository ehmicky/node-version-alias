import { execFile } from 'child_process'
import { createWriteStream, promises as fs } from 'fs'
import { join } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

import got from 'got'

const pPipeline = promisify(pipeline)
const pExecFile = promisify(execFile)

const NVM_URL = 'https://raw.githubusercontent.com/nvm-sh/nvm/master/nvm.sh'
export const NVM_DIR = `${__dirname}`
const NVM_DIST = `${NVM_DIR}/nvm.sh`

// We test `nvm` by downloading it locally. It is a Bash script and is not on
// `npm` so we need to download it.
export const downloadNvm = async function () {
  const response = await got.stream(NVM_URL)
  const stream = createWriteStream(NVM_DIST)
  await pPipeline(response, stream)

  await commentLine()
}

// `nvm.sh` last line executes `nvm use`. We need to comment it for tests.
const commentLine = async function () {
  const content = await fs.readFile(NVM_DIST, 'utf8')
  const contentA = content.replace(COMMENTED_LINE, '# $&')
  await fs.writeFile(NVM_DIST, contentA)
}

const COMMENTED_LINE = 'nvm_process_parameters "$@"'

export const cleanupNvm = async function () {
  await fs.unlink(NVM_DIST)
}

// Run `nvm` command in tests
export const runNvmCommand = async function (command) {
  const nvmPath = join(NVM_DIR, 'nvm.sh')
  const { stdout } = await pExecFile('bash', [
    '-c',
    `source "${nvmPath}" && ${command}`,
  ])
  return stdout.trim()
}
