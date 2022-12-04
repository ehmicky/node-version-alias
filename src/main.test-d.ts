import nodeVersionAlias, {
  type Options,
  type SemverVersion,
} from 'node-version-alias'
import { expectType, expectAssignable, expectNotAssignable } from 'tsd'

expectType<SemverVersion>(await nodeVersionAlias('alias'))
// @ts-expect-error
nodeVersionAlias()
// @ts-expect-error
nodeVersionAlias(true)

nodeVersionAlias('alias', {})
expectAssignable<Options>({})
// @ts-expect-error
nodeVersionAlias('alias', true)

nodeVersionAlias('alias', { mirror: 'http://example.com' })
expectAssignable<Options>({ mirror: 'http://example.com' })
// @ts-expect-error
nodeVersionAlias('alias', { mirror: true })

nodeVersionAlias('alias', { fetch: true })
nodeVersionAlias('alias', { fetch: undefined })
expectAssignable<Options>({ fetch: true })
// @ts-expect-error
nodeVersionAlias('alias', { fetch: 'true' })

expectAssignable<SemverVersion>('1.2.3')
expectAssignable<SemverVersion>('0.0.1')
expectAssignable<SemverVersion>('10.10.10')
expectAssignable<SemverVersion>('1.2.3-beta')
expectNotAssignable<SemverVersion>('1.2.a')
expectNotAssignable<SemverVersion>('1.2')
expectNotAssignable<SemverVersion>('1')
