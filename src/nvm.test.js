import { env, version as processVersion } from 'node:process'

import test from 'ava'
import nodeVersionAlias from 'node-version-alias'

import {
  NVM_DIR,
  downloadNvm,
  cleanupNvm,
  runNvmCommand,
} from './helpers/nvm/main.test.js'
import { FULL_VERSION, UNKNOWN_ALIAS } from './helpers/versions.test.js'

// eslint-disable-next-line fp/no-mutation
env.NVM_DIR = NVM_DIR

test.before(downloadNvm)
test.after(cleanupNvm)

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
