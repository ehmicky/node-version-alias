import allNodeVersions from 'all-node-versions'
import test from 'ava'
import nodeVersionAlias from 'node-version-alias'
import semver from 'semver'
import { each } from 'test-each'

import { LATEST_BORON } from './helpers/versions.test.js'

const getLatestFromMajor = async (version) => {
  const { versions } = await allNodeVersions()
  const versionsA = versions.map(getNodeVersion)
  const majorVersion = semver.major(version)
  return versionsA.find((versionA) => semver.major(versionA) === majorVersion)
}

const getNodeVersion = ({ node }) => node

each(['lts/-99', 'lts/-0', 'lts/unknown'], ({ title }, alias) => {
  test(`Validates "lts/" | ${title}`, async (t) => {
    await t.throwsAsync(nodeVersionAlias(alias))
  })
})

each(['lts', 'lts/*'], ({ title }, alias) => {
  test(`Can target latest LTS | ${title}`, async (t) => {
    const version = await nodeVersionAlias(alias)
    t.is(await getLatestFromMajor(version), version)
  })
})

test('Can use "lts/-number"', async (t) => {
  const [ltsOne, ltsTwo] = await Promise.all([
    nodeVersionAlias('lts/-1'),
    nodeVersionAlias('lts/-2'),
  ])

  t.is(await getLatestFromMajor(ltsOne), ltsOne)
  t.is(await getLatestFromMajor(ltsTwo), ltsTwo)

  t.true(semver.gt(ltsOne, ltsTwo))
})

each(['lts/boron', 'boron'], ({ title }, alias) => {
  test(`Can use "lts" by name | ${title}`, async (t) => {
    const version = await nodeVersionAlias(alias)
    t.is(version, LATEST_BORON)
  })
})
