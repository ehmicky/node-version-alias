import test from 'ava'
import { each } from 'test-each'

import nodeVersionAlias from '../src/main.js'

const FULL_VERSION = '6.0.0'

each([{ fetch: 0 }, { mirror: false }], ({ title }, opts) => {
  test(`Validates options | ${title}`, async (t) => {
    await t.throwsAsync(nodeVersionAlias(FULL_VERSION, opts))
  })
})
