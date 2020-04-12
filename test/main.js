import test from 'ava'

import nodeVersionAlias from '../src/main.js'

const FULL_VERSION = '6.0.0'
const MAJOR_VERSION = '6'
const MAJOR_FULL_VERSION = '6.17.1'
const UNKNOWN_VERSION = '6.99.0'

test('Keep full versions', async (t) => {
  const version = await nodeVersionAlias(FULL_VERSION)
  t.is(version, FULL_VERSION)
})

test('Resolve version ranges', async (t) => {
  const version = await nodeVersionAlias(MAJOR_VERSION)
  t.is(version, MAJOR_FULL_VERSION)
})

test('Validates unknown version', async (t) => {
  await t.throwsAsync(nodeVersionAlias(UNKNOWN_VERSION))
})

test('Passes options to all-node-versions', async (t) => {
  await t.throwsAsync(
    nodeVersionAlias(FULL_VERSION, { mirror: INVALID_MIRROR, fetch: true }),
  )
})

const INVALID_MIRROR = 'http://invalid-mirror.com'
