import normalizeNodeVersion from 'normalize-node-version'
import semver from 'semver'

import { getConstantAlias } from './constant.js'
import { getLtsAlias } from './lts.js'
import { getNvmCustomAlias } from './nvm.js'
import { getOpts } from './options.js'

// Resolve Node.js version managers aliases like `latest`, `lts` or `erbium`.
// First resolve them to a version range, then to a full version.
const nodeVersionAlias = async (alias, opts) => {
  const { allNodeOpts, normalizeOpts } = getOpts(opts)
  const versionRange = await getVersionRange(alias, allNodeOpts)

  if (versionRange === undefined) {
    throw new Error(`Invalid Node.js version alias: ${alias}`)
  }

  const version = await normalizeNodeVersion(versionRange, normalizeOpts)
  return version
}

export default nodeVersionAlias

const getVersionRange = async (alias, allNodeOpts) => {
  if (semver.validRange(alias) !== null) {
    return alias
  }

  const versionRange = await getConstantAlias(alias)

  if (versionRange !== undefined) {
    return versionRange
  }

  const versionRangeA = await getLtsAlias(alias, allNodeOpts)

  if (versionRangeA !== undefined) {
    return versionRangeA
  }

  return getRecursiveNvmAlias(alias, allNodeOpts)
}

// nvm custom aliases can be recursive
const getRecursiveNvmAlias = async (alias, allNodeOpts) => {
  const aliasResult = await getNvmCustomAlias(alias)

  if (aliasResult === undefined) {
    return
  }

  return getVersionRange(aliasResult, allNodeOpts)
}
