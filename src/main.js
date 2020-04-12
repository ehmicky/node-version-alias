import normalizeNodeVersion from 'normalize-node-version'
import { validRange } from 'semver'

import { getConstantAlias } from './constant.js'
import { getLts } from './lts.js'
import { getNvmCustomAlias } from './nvm.js'
import { getOpts } from './options.js'

// Resolve Node.js version managers aliases like `latest`, `lts` or `erbium`
// First resolve them to a version range, then to a full version
export const nodeVersionAlias = async function (alias, opts) {
  const { allNodeOpts, normalizeOpts } = getOpts(opts)
  const versionRange = await getVersionRange(alias, allNodeOpts)

  if (versionRange === undefined) {
    throw new Error(`Invalid Node.js version alias: ${alias}`)
  }

  const version = await normalizeNodeVersion(versionRange, normalizeOpts)
  return version
}

const getVersionRange = async function (alias, allNodeOpts) {
  if (validRange(alias) !== null) {
    return alias
  }

  const versionRange = await getConstantAlias(alias)

  if (versionRange !== undefined) {
    return versionRange
  }

  if (alias.startsWith('lts')) {
    return getLts(alias, allNodeOpts)
  }

  return getRecursiveNvmAlias(alias, allNodeOpts)
}

// nvm custom aliases can be recursive
const getRecursiveNvmAlias = async function (alias, allNodeOpts) {
  const aliasResult = await getNvmCustomAlias(alias)

  if (aliasResult === undefined) {
    return
  }

  return getVersionRange(aliasResult, allNodeOpts)
}

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = nodeVersionAlias
