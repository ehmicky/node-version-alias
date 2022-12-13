import { getNvmSystemVersion } from './nvm.js'

// Resolve aliases whose name is a constant and is not LTS-related
export const getConstantAlias = (alias) => {
  const versionRange = ALIASES[alias]

  if (versionRange === undefined) {
    return
  }

  if (typeof versionRange !== 'function') {
    return versionRange
  }

  return versionRange()
}

const ALIASES = {
  // Latest version (nave, nvm-windows, n, nvs, nodebrew, nodist, fish-nvm)
  latest: '*',
  // Latest version (nvm, nave, nodebrew)
  stable: '*',
  // Latest version (nvm)
  node: '*',
  // Latest version (n, fish-nvm)
  current: '*',
  // Version if nvm was not installed
  system: getNvmSystemVersion,
  // Alias from nvm. Now that iojs is merged to Node.js, it is always this
  // version.
  iojs: '4.0.0',
  // Old deprecated nvm alias
  unstable: '0.11',
}
