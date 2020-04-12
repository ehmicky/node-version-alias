import test from 'ava'
import { each } from 'test-each'

import nodeVersionAlias from '../src/main.js'

const IOJS_VERSION = '4.0.0'
const UNSTABLE_VERSION = '0.11.16'

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
