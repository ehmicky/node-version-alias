import test from 'ava'

import nodeVersionAlias from '../src/main.js'

test('Dummy test', (t) => {
  t.is(typeof nodeVersionAlias, 'function')
})
