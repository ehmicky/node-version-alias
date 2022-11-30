import test from 'ava'
import nodeVersionAlias from 'node-version-alias'

import {
  FULL_VERSION,
  MAJOR_VERSION,
  MAJOR_FULL_VERSION,
  UNKNOWN_VERSION,
} from './helpers/versions.test.js'

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

const INVALID_MIRROR = 'not_valid_url'
