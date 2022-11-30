import test from 'ava'
import nodeVersionAlias from 'node-version-alias'
import { each } from 'test-each'

import { FULL_VERSION } from './helpers/versions.test.js'

each([true, { fetch: 0 }], ({ title }, opts) => {
  test(`Validates options | ${title}`, async (t) => {
    await t.throwsAsync(nodeVersionAlias(FULL_VERSION, opts))
  })
})
