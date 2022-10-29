import type { Options as AllNodeVersionsOptions } from 'all-node-versions'
import type {
  Options as NormalizeNodeVersionOptions,
  SemverVersion,
} from 'normalize-node-version'

export type { SemverVersion }

export interface Options {
  /**
   * Base URL.
   * Can be customized (for example `https://npmmirror.com/mirrors/node`).
   *
   * The following environment variables can also be used: `NODE_MIRROR`,
   * `NVM_NODEJS_ORG_MIRROR`, `N_NODE_MIRROR` or `NODIST_NODE_MIRROR`.
   *
   * @default 'https://nodejs.org/dist'
   */
  mirror?: AllNodeVersionsOptions['mirror'] &
    NormalizeNodeVersionOptions['mirror']

  /**
   * The list of available Node.js versions is cached for one hour by default.
   * If the `fetch` option is:
   *  - `true`: the cache will not be used
   *  - `false`: the cache will be used even if it's older than one hour
   *
   * @default `undefined`
   */
  fetch?: AllNodeVersionsOptions['fetch'] & NormalizeNodeVersionOptions['fetch']
}

/**
 * Resolve Node.js version aliases like `latest`, `lts` or `erbium`.
 * Those aliases are used by Node.js version managers like
 * [`nvm`](https://github.com/nvm-sh/nvm),
 * [`nvs`](https://github.com/jasongin/nvs), [`n`](https://github.com/tj/n),
 * [`nave`](https://github.com/isaacs/nave),
 * [`nodeenv`](https://github.com/ekalinin/nodeenv) or
 * [`nodist`](https://github.com/nullivex/nodist).
 *
 * This resolves them to a `"major.minor.patch"` version string. The following
 * aliases are supported:
 * - [`latest`](https://github.com/tj/n#specifying-node-versions),
 *   [`stable`](https://github.com/nvm-sh/nvm#usage),
 *   [`node`](https://github.com/nvm-sh/nvm#usage),
 *   [`current`](https://github.com/tj/n#specifying-node-versions): latest version
 * - [`lts`](https://github.com/jasongin/nvs#basic-usage) or
 *   [`lts/*`](https://github.com/nvm-sh/nvm#long-term-support): latest LTS version
 * - [`lts/-1`](https://github.com/nvm-sh/nvm#long-term-support),
 *   [`lts/-2`](https://github.com/nvm-sh/nvm#long-term-support), etc.:
 *   first/second/etc. latest LTS version
 * - [`lts/erbium`](https://github.com/nvm-sh/nvm#long-term-support),
 *   [`erbium`](https://github.com/nvm-sh/nvm#long-term-support), etc.: specific
 *   LTS, using its [name](https://github.com/nodejs/Release) (case-insensitive)
 * - nvm custom aliases (including `default`)
 * - [`system`](https://github.com/nvm-sh/nvm#system-version-of-node): Node.js
 *   version when `nvm` is deactivated
 * - [`iojs`](https://github.com/nvm-sh/nvm#usage): always `4.0.0`
 * - [`unstable`](https://github.com/nvm-sh/nvm#usage): always `0.11.6`
 *
 * Normal version ranges (like `12.1.0`, `12` or `>=10`) are valid inputs too.
 *
 * @example
 * ```js
 * // Note: the following examples might be out-of-sync with the actual versions
 * console.log(await nodeVersionAlias('latest')) // 18.4.0
 * console.log(await nodeVersionAlias('lts')) // 16.15.1
 * console.log(await nodeVersionAlias('lts/erbium')) // 12.22.12
 * console.log(await nodeVersionAlias('erbium')) // 12.22.12
 * console.log(await nodeVersionAlias('lts/-2')) // 14.19.3
 *
 * // Normal version ranges
 * console.log(await nodeVersionAlias('10.0.0')) // 10.0.0
 * console.log(await nodeVersionAlias('10')) // 10.24.1
 * console.log(await nodeVersionAlias('^10')) // 10.24.1
 * console.log(await nodeVersionAlias('>=10')) // 18.4.0
 *
 * // Allowed options
 * await nodeVersionAlias('latest', {
 *   // Use a mirror for Node.js binaries
 *   mirror: 'https://npmmirror.com/mirrors/node',
 *   // Do not cache the list of available Node.js versions
 *   fetch: true,
 * })
 * ```
 */
export default function nodeVersionAlias(
  alias: string,
  options?: Options,
): Promise<SemverVersion>
