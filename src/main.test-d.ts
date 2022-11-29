import {
  expectType,
  expectError,
  expectAssignable,
  expectNotAssignable,
} from 'tsd'

import nodeVersionAlias, { Options, SemverVersion } from 'node-version-alias'

expectType<SemverVersion>(await nodeVersionAlias('alias'))
expectError(nodeVersionAlias())
expectError(nodeVersionAlias(true))

nodeVersionAlias('alias', {})
expectAssignable<Options>({})
expectError(nodeVersionAlias('alias', true))

nodeVersionAlias('alias', { mirror: 'http://example.com' })
expectAssignable<Options>({ mirror: 'http://example.com' })
expectError(nodeVersionAlias('alias', { mirror: true }))

nodeVersionAlias('alias', { fetch: true })
nodeVersionAlias('alias', { fetch: undefined })
expectAssignable<Options>({ fetch: true })
expectError(nodeVersionAlias('alias', { fetch: 'true' }))

expectAssignable<SemverVersion>('1.2.3')
expectAssignable<SemverVersion>('0.0.1')
expectAssignable<SemverVersion>('10.10.10')
expectAssignable<SemverVersion>('1.2.3-beta')
expectNotAssignable<SemverVersion>('1.2.a')
expectNotAssignable<SemverVersion>('1.2')
expectNotAssignable<SemverVersion>('1')
