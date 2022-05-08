import { execFile } from 'child_process'
import { createWriteStream } from 'fs'
import { readFile, writeFile, unlink } from 'fs/promises'
import { join, dirname } from 'path'
import { pipeline } from 'stream'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

import got from 'got'

const pExecFile = promisify(execFile)
// TODO: use `stream/promises` instead once dropping support for Node <15.0.0
const pPipeline = promisify(pipeline)

const NVM_URL = 'https://raw.githubusercontent.com/nvm-sh/nvm/master/nvm.sh'
export const NVM_DIR = dirname(fileURLToPath(import.meta.url))
const NVM_DIST = join(NVM_DIR, 'nvm.sh')

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
  const content = await readFile(NVM_DIST, 'utf8')
  const contentA = content.replace(COMMENTED_LINE, '# $&')
  await writeFile(NVM_DIST, contentA)
}

const COMMENTED_LINE = 'nvm_process_parameters "$@"'

export const cleanupNvm = async function () {
  await unlink(NVM_DIST)
}

// Run `nvm` command in tests
export const runNvmCommand = async function (command) {
  const { stdout } = await pExecFile('bash', [
    '-c',
    `source "${NVM_DIST}" && ${command}`,
  ])
  return stdout.trim()
}
