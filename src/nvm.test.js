import { execFile } from 'node:child_process'
import { createWriteStream } from 'node:fs'
import { readFile, writeFile, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { env, version as processVersion } from 'node:process'
import { pipeline } from 'node:stream/promises'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import test from 'ava'
import { got } from 'got'
import nodeVersionAlias from 'node-version-alias'

// eslint-disable-next-line import/max-dependencies
import { FULL_VERSION, UNKNOWN_ALIAS } from './helpers/versions.test.js'

const pExecFile = promisify(execFile)

const NVM_URL = 'https://raw.githubusercontent.com/nvm-sh/nvm/master/nvm.sh'
const NVM_DIR = dirname(fileURLToPath(import.meta.url))
const NVM_DIST = join(NVM_DIR, 'nvm.sh')

// eslint-disable-next-line fp/no-mutation
env.NVM_DIR = NVM_DIR

// We test `nvm` by downloading it locally. It is a Bash script and is not on
// `npm` so we need to download it.
const downloadNvm = async () => {
  const response = await got.stream(NVM_URL)
  const stream = createWriteStream(NVM_DIST)
  await pipeline(response, stream)

  await commentLine()
}

// `nvm.sh` last line executes `nvm use`. We need to comment it for tests.
const commentLine = async () => {
  const content = await readFile(NVM_DIST, 'utf8')
  const contentA = content.replace(COMMENTED_LINE, '# BODY')
  await writeFile(NVM_DIST, contentA)
}

const COMMENTED_LINE = 'nvm_process_parameters "$@"'

const cleanupNvm = async () => {
  await unlink(NVM_DIST)
}

test.before(downloadNvm)
test.after(cleanupNvm)

// Run `nvm` command in tests
const runNvmCommand = async (command) => {
  const { stdout } = await pExecFile('bash', [
    '-c',
    `source "${NVM_DIST}" && ${command}`,
  ])
  return stdout.trim()
}

test('Can use "system" alias', async (t) => {
  const version = await nodeVersionAlias('system')
  t.is(`v${version}`, processVersion)
})

test('Can use nvm custom aliases', async (t) => {
  await runNvmCommand(`nvm alias a ${FULL_VERSION}`)

  try {
    const version = await nodeVersionAlias('a')
    t.is(version, FULL_VERSION)
  } finally {
    await runNvmCommand('nvm unalias a')
  }
})

test('Can use nvm custom aliases recursively', async (t) => {
  await runNvmCommand(`nvm alias b ${FULL_VERSION} && nvm alias c b`)

  try {
    const version = await nodeVersionAlias('c')
    t.is(version, FULL_VERSION)
  } finally {
    await runNvmCommand('nvm unalias c && nvm unalias b')
  }
})

test('Validates unknown nvm custom alias', async (t) => {
  await t.throwsAsync(nodeVersionAlias(UNKNOWN_ALIAS))
})

// Modifies environment variable so must be serial
test.serial('Require nvm to look for custom aliases', async (t) => {
  await runNvmCommand(`nvm alias a ${FULL_VERSION}`)
  // eslint-disable-next-line fp/no-delete
  delete env.NVM_DIR

  try {
    await t.throwsAsync(nodeVersionAlias('a'))
  } finally {
    // eslint-disable-next-line require-atomic-updates, fp/no-mutation
    env.NVM_DIR = NVM_DIR
    await runNvmCommand('nvm unalias a')
  }
})

test.serial('Handles non-existing NVM_DIR', async (t) => {
  await runNvmCommand(`nvm alias a ${FULL_VERSION}`)
  // eslint-disable-next-line fp/no-mutation
  env.NVM_DIR = '/doesNotExist'

  try {
    await t.throwsAsync(nodeVersionAlias('a'))
  } finally {
    // eslint-disable-next-line fp/no-mutation
    env.NVM_DIR = NVM_DIR
    await runNvmCommand('nvm unalias a')
  }
})
