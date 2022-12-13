import isPlainObj from 'is-plain-obj'

// Normalize options and assign default values
export const getOpts = (opts = {}) => {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }

  const { fetch: fetchOpt, mirror } = opts
  const normalizeOpts = { fetch: fetchOpt, mirror }
  const allNodeOpts = { fetch: fetchOpt, mirror }
  return { normalizeOpts, allNodeOpts }
}
