import allNodeVersions from 'all-node-versions'
import test from 'ava'
import { major as getMajor, gt as gtVersion } from 'semver'
import { each } from 'test-each'

import nodeVersionAlias from '../src/main.js'

import { LATEST_BORON } from './helpers/versions.js'

const getLatestFromMajor = async function (version) {
  const { versions } = await allNodeVersions()
  const majorVersion = getMajor(version)
  return versions.find((versionA) => getMajor(versionA) === majorVersion)
}

each(['lts', 'lts/*', 'lts/-0'], ({ title }, alias) => {
  test(`Can target latest LTS | ${title}`, async (t) => {
    const version = await nodeVersionAlias(alias)
    const latestLts = await getLatestFromMajor(version)
    t.is(version, latestLts)
  })
})

test('Can use "lts/-number"', async (t) => {
  const [ltsOne, ltsTwo] = await Promise.all([
    nodeVersionAlias('lts/-1'),
    nodeVersionAlias('lts/-2'),
  ])

  const latestLtsOne = await getLatestFromMajor(ltsOne)
  t.is(ltsOne, latestLtsOne)
  const latestLtsTwo = await getLatestFromMajor(ltsTwo)
  t.is(ltsTwo, latestLtsTwo)

  t.true(gtVersion(ltsOne, ltsTwo))
})

test('Validates "lts/-number"', async (t) => {
  await t.throwsAsync(nodeVersionAlias('lts/-99'))
})

test('Can use "lts/name"', async (t) => {
  const version = await nodeVersionAlias('lts/boron')
  t.is(version, LATEST_BORON)
})

test('Validates "lts/name"', async (t) => {
  await t.throwsAsync(nodeVersionAlias('lts/unknown'))
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
