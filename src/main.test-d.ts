import nodeVersionAlias, {
  type Options,
  type SemverVersion,
} from 'node-version-alias'
import { expectType, expectAssignable, expectNotAssignable } from 'tsd'

expectType<SemverVersion>(await nodeVersionAlias('alias'))
// @ts-expect-error
await nodeVersionAlias()
// @ts-expect-error
await nodeVersionAlias(true)

await nodeVersionAlias('alias', {})
expectAssignable<Options>({})
// @ts-expect-error
await nodeVersionAlias('alias', true)

await nodeVersionAlias('alias', { mirror: 'http://example.com' })
expectAssignable<Options>({ mirror: 'http://example.com' })
// @ts-expect-error
await nodeVersionAlias('alias', { mirror: true })

await nodeVersionAlias('alias', { signal: AbortSignal.abort() })
expectAssignable<Options>({ signal: AbortSignal.abort() })
// @ts-expect-error
await nodeVersionAlias('alias', { signal: 'signal' })

await nodeVersionAlias('alias', { fetch: true })
await nodeVersionAlias('alias', { fetch: undefined })
expectAssignable<Options>({ fetch: true })
// @ts-expect-error
await nodeVersionAlias('alias', { fetch: 'true' })

expectAssignable<SemverVersion>('1.2.3')
expectAssignable<SemverVersion>('0.0.1')
expectAssignable<SemverVersion>('10.10.10')
expectAssignable<SemverVersion>('1.2.3-beta')
expectNotAssignable<SemverVersion>('1.2.a')
expectNotAssignable<SemverVersion>('1.2')
expectNotAssignable<SemverVersion>('1')
