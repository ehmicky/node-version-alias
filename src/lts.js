import allNodeVersions from 'all-node-versions'

// Normalize `lts`, `lts/*`, `lts/-num` and `[lts/]name` aliases used by
// `.nvmrc` and others
export const getLtsAlias = async (alias, allNodeOpts) => {
  const ltsMajors = await getLtsMajors(allNodeOpts)
  const major = getLtsMajor(alias, ltsMajors)

  if (major === undefined) {
    return
  }

  return major.latest
}

// Retrieve all major releases that are LTS
export const getLtsMajors = async (allNodeOpts) => {
  const { majors } = await allNodeVersions(allNodeOpts)
  return majors.filter(isLts)
}

const isLts = ({ lts }) => lts !== undefined

// Find the LTS that matches the alias
const getLtsMajor = (alias, ltsMajors) => {
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
// `lts` is used by n, nave, nvs, fish-nvm
// `lts/*` is used by nvm, nave, nvs
const LATEST_LTS = new Set(['lts', 'lts/*'])

// `lts/-num` means the numth+1 latest LTS.
// Used by nvm
const getNumberedLts = (alias, ltsMajors) => {
  const result = NUMBER_LTS_REGEXP.exec(alias)
  return result === null || result[1] === '0' ? undefined : ltsMajors[result[1]]
}

const NUMBER_LTS_REGEXP = /^lts\/-(\d+)$/u

// `lts/name` or just `name` means a specific LTS named likewise.
// Used by nvm, nave, nvs, fish-nvm
const getNamedLts = (alias, ltsMajors) => {
  const name = alias.replace(LTS_PREFIX, '').toLowerCase()
  return ltsMajors.find(({ lts }) => lts === name)
}

const LTS_PREFIX = 'lts/'
