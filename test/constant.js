import test from 'ava'
// eslint-disable-next-line node/no-extraneous-import
import nodeVersionAlias from 'node-version-alias'
import { each } from 'test-each'

import { IOJS_VERSION, UNSTABLE_VERSION } from './helpers/versions.js'

each(['latest', 'stable', 'node', 'current'], ({ title }, alias) => {
  test(`Latest version | ${title}`, async (t) => {
    const [version, latestVersion] = await Promise.all([
      nodeVersionAlias(alias),
      nodeVersionAlias('*'),
    ])
    t.is(version, latestVersion)
  })
})

test('iojs', async (t) => {
  const version = await nodeVersionAlias('iojs')
  t.is(version, IOJS_VERSION)
})

test('unstable', async (t) => {
  const version = await nodeVersionAlias('unstable')
  t.is(version, UNSTABLE_VERSION)
})
