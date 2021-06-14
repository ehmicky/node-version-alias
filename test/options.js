import test from 'ava'
// eslint-disable-next-line node/no-extraneous-import
import nodeVersionAlias from 'node-version-alias'
import { each } from 'test-each'

import { FULL_VERSION } from './helpers/versions.js'

each([{ fetch: 0 }, { mirror: false }], ({ title }, opts) => {
  test(`Validates options | ${title}`, async (t) => {
    await t.throwsAsync(nodeVersionAlias(FULL_VERSION, opts))
  })
})
