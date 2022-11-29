[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/node-version-alias)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/node-version-alias)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

Resolve Node.js version aliases like `latest`, `lts` or `erbium`.

Those aliases are used by Node.js version managers like
[`nvm`](https://github.com/nvm-sh/nvm),
[`nvs`](https://github.com/jasongin/nvs), [`n`](https://github.com/tj/n),
[`nave`](https://github.com/isaacs/nave),
[`nodeenv`](https://github.com/ekalinin/nodeenv) or
[`nodist`](https://github.com/nullivex/nodist).

This resolves them to a `"major.minor.patch"` version string. The following
aliases are supported:

- [`latest`](https://github.com/tj/n#specifying-node-versions),
  [`stable`](https://github.com/nvm-sh/nvm#usage),
  [`node`](https://github.com/nvm-sh/nvm#usage),
  [`current`](https://github.com/tj/n#specifying-node-versions): latest version
- [`lts`](https://github.com/jasongin/nvs#basic-usage) or
  [`lts/*`](https://github.com/nvm-sh/nvm#long-term-support): latest LTS version
- [`lts/-1`](https://github.com/nvm-sh/nvm#long-term-support),
  [`lts/-2`](https://github.com/nvm-sh/nvm#long-term-support), etc.:
  first/second/etc. latest LTS version
- [`lts/erbium`](https://github.com/nvm-sh/nvm#long-term-support),
  [`erbium`](https://github.com/nvm-sh/nvm#long-term-support), etc.: specific
  LTS, using its [name](https://github.com/nodejs/Release) (case-insensitive)
- nvm custom aliases (including `default`)
- [`system`](https://github.com/nvm-sh/nvm#system-version-of-node): Node.js
  version when `nvm` is deactivated
- [`iojs`](https://github.com/nvm-sh/nvm#usage): always `4.0.0`
- [`unstable`](https://github.com/nvm-sh/nvm#usage): always `0.11.6`

Normal version ranges (like `12.1.0`, `12` or `>=10`) are valid inputs too.

# Examples

```js
import nodeVersionAlias from 'node-version-alias'

// Note: the following examples might be out-of-sync with the actual versions
console.log(await nodeVersionAlias('latest')) // 18.4.0
console.log(await nodeVersionAlias('lts')) // 16.15.1
console.log(await nodeVersionAlias('lts/erbium')) // 12.22.12
console.log(await nodeVersionAlias('erbium')) // 12.22.12
console.log(await nodeVersionAlias('lts/-2')) // 14.19.3

// Normal version ranges
console.log(await nodeVersionAlias('10.0.0')) // 10.0.0
console.log(await nodeVersionAlias('10')) // 10.24.1
console.log(await nodeVersionAlias('^10')) // 10.24.1
console.log(await nodeVersionAlias('>=10')) // 18.4.0

// Allowed options
await nodeVersionAlias('latest', {
  // Use a mirror for Node.js binaries
  mirror: 'https://npmmirror.com/mirrors/node',
  // Do not cache the list of available Node.js versions
  fetch: true,
})
```

# Install

```bash
npm install node-version-alias
```

This package works in Node.js >=14.18.0. It is an ES module and must be loaded
using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# Usage

## nodeVersionAlias(alias, options?)

`alias`: `string`\
`options`: `object?`\
_Returns_: `Promise<string>`

The return value resolves to a `"major.minor.patch"` version string.

### options

#### mirror

_Type_: `string`\
_Default_: `https://nodejs.org/dist`

Base URL to fetch the list of available Node.js versions. Can be customized (for
example `https://npmmirror.com/mirrors/node`).

The following environment variables can also be used: `NODE_MIRROR`,
`NVM_NODEJS_ORG_MIRROR`, `N_NODE_MIRROR` or `NODIST_NODE_MIRROR`.

#### fetch

_Type_: `boolean`\
_Default_: `undefined`

The list of available Node.js versions is cached for one hour by default. If the
`fetch` option is:

- `true`: the cache will not be used
- `false`: the cache will be used even if it's older than one hour

# See also

- [`nve`](https://github.com/ehmicky/nve): Run a specific Node.js version (CLI)
- [`nvexeca`](https://github.com/ehmicky/nve): Run a specific Node.js version
  (programmatic)
- [`get-node`](https://github.com/ehmicky/get-node): Download Node.js
- [`normalize-node-version`](https://github.com/ehmicky/normalize-node-version):
  Normalize and validate Node.js versions
- [`preferred-node-version`](https://github.com/ehmicky/preferred-node-version):
  Get the preferred Node.js version of a project or user
- [`all-node-versions`](https://github.com/ehmicky/all-node-versions): List all
  available Node.js versions
- [`fetch-node-website`](https://github.com/ehmicky/fetch-node-website): Fetch
  releases on nodejs.org

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

Thanks go to our wonderful contributors:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt=""/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/node-version-alias/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/node-version-alias/commits?author=ehmicky" title="Documentation">📖</a></td>
    <td align="center"><a href="https://twitter.com/adrieankhisbe"><img src="https://avatars1.githubusercontent.com/u/2601132?v=4" width="100px;" alt=""/><br /><sub><b>Adrien Becchis</b></sub></a><br /><a href="https://github.com/ehmicky/node-version-alias/commits?author=AdrieanKhisbe" title="Code">💻</a> <a href="https://github.com/ehmicky/node-version-alias/commits?author=AdrieanKhisbe" title="Tests">⚠️</a> <a href="#ideas-AdrieanKhisbe" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
