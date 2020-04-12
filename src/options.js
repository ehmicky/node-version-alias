import filterObj from 'filter-obj'
import { validate } from 'jest-validate'

// Normalize options and assign default values
export const getOpts = function (opts = {}) {
  validate(opts, { exampleConfig: EXAMPLE_OPTS })

  const optsA = filterObj(opts, isDefined)
  const optsB = { ...DEFAULT_OPTS, ...optsA }

  const { fetch, mirror } = optsB
  const normalizeOpts = { fetch, mirror }
  const allNodeOpts = { fetch, mirror }
  return { normalizeOpts, allNodeOpts }
}

const DEFAULT_OPTS = {}

const EXAMPLE_OPTS = {
  // Passed to `all-node-versions`
  fetch: true,
  // Passed to `fetch-node-website`
  mirror: 'https://nodejs.org/dist',
}

const isDefined = function (key, value) {
  return value !== undefined
}
