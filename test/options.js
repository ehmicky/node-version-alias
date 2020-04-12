import test from 'ava'
import { each } from 'test-each'

import nodeVersionAlias from '../src/main.js'

import { FULL_VERSION } from './helpers/versions.js'

each([{ fetch: 0 }, { mirror: false }], ({ title }, opts) => {
  test(`Validates options | ${title}`, async (t) => {
    await t.throwsAsync(nodeVersionAlias(FULL_VERSION, opts))
  })
})
