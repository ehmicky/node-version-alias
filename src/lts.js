import allNodeVersions from 'all-node-versions'

// Normalize `lts`, `lts/*`, `lts/-num` and `[lts/]name` aliases used by
// `.nvmrc` and others
export const getLtsAlias = async function (alias, allNodeOpts) {
  const ltsMajors = await getLtsMajors(allNodeOpts)
  const major = getLtsMajor(alias, ltsMajors)

  if (major === undefined) {
    return
  }

  return major.latest
}

// Retrieve all major releases that are LTS
export const getLtsMajors = async function (allNodeOpts) {
  const { majors } = await allNodeVersions(allNodeOpts)
  return majors.filter(isLts)
}

const isLts = function ({ lts }) {
  return lts !== undefined
}

// Find the LTS that matches the alias
const getLtsMajor = function (alias, ltsMajors) {
  if (LATEST_LTS.has(alias)) {
    return ltsMajors[0]
  }

  const major = getNumberedLts(alias, ltsMajors)

  if (major !== undefined) {
    return major
  }

  return getNamedLts(alias, ltsMajors)
}

// Those aliases mean the latest LTS
// `lts/*` is used by nvm, nave, nvs
// `lts` is used by n, nave, nvs, fish-nvm
// `lts/-0` is used by nvm
const LATEST_LTS = new Set(['lts', 'lts/*', 'lts/-0'])

// `lts/-num` means the numth latest LTS.
// Used by nvm
const getNumberedLts = function (alias, ltsMajors) {
  const result = NUMBER_LTS_REGEXP.exec(alias)

  if (result === null) {
    return
  }

  return ltsMajors[result[1] - 1]
}

const NUMBER_LTS_REGEXP = /^lts\/-(\d+)$/u

// `lts/name` or just `name` means a specific LTS named likewise.
// Used by nvm, nave, nvs, fish-nvm
const getNamedLts = function (alias, ltsMajors) {
  const name = alias.replace(LTS_PREFIX, '').toLowerCase()
  return ltsMajors.find(({ lts }) => lts === name)
}

const LTS_PREFIX = 'lts/'
