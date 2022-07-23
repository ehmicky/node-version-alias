import { excludeKeys } from 'filter-obj'
import { validate } from 'jest-validate'

// Normalize options and assign default values
export const getOpts = function (opts = {}) {
  validate(opts, { exampleConfig: EXAMPLE_OPTS })

  const optsA = excludeKeys(opts, isUndefined)
  const optsB = { ...DEFAULT_OPTS, ...optsA }

  const { fetch: fetchOpt, mirror } = optsB
  const normalizeOpts = { fetch: fetchOpt, mirror }
  const allNodeOpts = { fetch: fetchOpt, mirror }
  return { normalizeOpts, allNodeOpts }
}

const DEFAULT_OPTS = {}

const EXAMPLE_OPTS = {
  // Passed to `all-node-versions`
  fetch: true,
  // Passed to `fetch-node-website`
  mirror: 'https://nodejs.org/dist',
}

const isUndefined = function (key, value) {
  return value === undefined
}
