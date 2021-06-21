import allNodeVersions from 'all-node-versions'
import test from 'ava'
import nodeVersionAlias from 'node-version-alias'
import semver from 'semver'
import { each } from 'test-each'

import { LATEST_BORON } from './helpers/versions.js'

const getLatestFromMajor = async function (version) {
  const { versions } = await allNodeVersions()
  const majorVersion = semver.major(version)
  return versions.find((versionA) => semver.major(versionA) === majorVersion)
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

  t.true(semver.gt(ltsOne, ltsTwo))
})

test('Validates "lts/-number"', async (t) => {
  await t.throwsAsync(nodeVersionAlias('lts/-99'))
})

test('Can use "lts/name"', async (t) => {
  const version = await nodeVersionAlias('lts/boron')
  t.is(version, LATEST_BORON)
})

test('Can use "ltsName"', async (t) => {
  const version = await nodeVersionAlias('boron')
  t.is(version, LATEST_BORON)
})

test('Validates "lts/name"', async (t) => {
  await t.throwsAsync(nodeVersionAlias('lts/unknown'))
})
