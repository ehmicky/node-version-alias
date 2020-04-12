import allNodeVersions from 'all-node-versions'
import test from 'ava'
import { major as getMajor } from 'semver'
import { each } from 'test-each'

import nodeVersionAlias from '../src/main.js'

each(['lts', 'lts/*', 'lts/-0'], ({ title }, alias) => {
  test(`Can target latest LTS | ${title}`, async (t) => {
    const [version, { majors }] = await Promise.all([
      nodeVersionAlias(alias),
      allNodeVersions(),
    ])
    const majorVersion = getMajor(version)
    // eslint-disable-next-line max-nested-callbacks
    const latestLts = majors.find(({ major }) => major === majorVersion).latest
    t.is(version, latestLts)
  })
})

// This test requires non-implemented features:
//  - per-mirror `index.js` caching
//  - v8 canary mirror support
// eslint-disable-next-line ava/no-skip-test
test.skip('lts with wrong mirror', async (t) => {
  const [version, latestVersion] = await Promise.all([
    nodeVersionAlias('lts', { mirror: V8_CANARY_MIRROR }),
    nodeVersionAlias('*', { mirror: V8_CANARY_MIRROR }),
  ])
  t.is(version, latestVersion)
})

const V8_CANARY_MIRROR = 'https://nodejs.org/download/v8-canary'
