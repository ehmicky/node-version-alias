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
 * Download release files available on
 * [`https://nodejs.org/dist/`](https://nodejs.org/dist/).
 *
 * @example
 * ```js
 * const stream = await fetchNodeWebsite('v12.8.0/node-v12.8.0-linux-x64.tar.gz')
 *
 * // Example with options
 * const otherStream = await fetchNodeWebsite(
 *   'v12.8.0/node-v12.8.0-linux-x64.tar.gz',
 *   {
 *     progress: true,
 *     mirror: 'https://npmmirror.com/mirrors/node',
 *   },
 * )
 * ```
 */
export default function fetchNodeWebsite(
  alias: string,
  options?: Options,
): Promise<SemverVersion>
