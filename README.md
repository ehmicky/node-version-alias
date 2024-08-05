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

# Hire me

Please
[reach out](https://www.linkedin.com/feed/update/urn:li:activity:7117265228068716545/)
if you're looking for a Node.js API or CLI engineer (11 years of experience).
Most recently I have been [Netlify Build](https://github.com/netlify/build)'s
and [Netlify Plugins](https://www.netlify.com/products/build/plugins/)'
technical lead for 2.5 years. I am available for full-time remote positions.

# Examples

```js
import nodeVersionAlias from 'node-version-alias'

// Note: the following examples might be out-of-sync with the actual versions
console.log(await nodeVersionAlias('latest')) // 19.3.0
console.log(await nodeVersionAlias('lts')) // 18.12.1
console.log(await nodeVersionAlias('lts/erbium')) // 12.22.12
console.log(await nodeVersionAlias('erbium')) // 12.22.12
console.log(await nodeVersionAlias('lts/-2')) // 14.21.2

// Normal version ranges
console.log(await nodeVersionAlias('10.0.0')) // 10.0.0
console.log(await nodeVersionAlias('10')) // 10.24.1
console.log(await nodeVersionAlias('^10')) // 10.24.1
console.log(await nodeVersionAlias('>=10')) // 19.3.0

// Allowed options
await nodeVersionAlias('latest', {
  // Use a mirror for Node.js binaries
  mirror: 'https://npmmirror.com/mirrors/node',
  // Do not cache the list of available Node.js versions
  fetch: true,
  // Cancels when the signal is aborted
  signal: new AbortController().signal,
})
```

# Install

```bash
npm install node-version-alias
```

This package works in Node.js >=18.18.0.

This is an ES module. It must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

# Usage

## nodeVersionAlias(alias, options?)

`alias`: `string`\
`options`: [`Options?`](#options)\
_Returns_: `Promise<string>`

The return value resolves to a `"major.minor.patch"` version string.

### Options

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

#### signal

_Type_:
[`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)

Cancels when the signal is aborted.

# CLI

[`nve`](https://github.com/ehmicky/nve) can be used to
[run `node-version-alias` as a CLI](https://github.com/ehmicky/nve#examples-list-versions).
The [`--mirror`](https://github.com/ehmicky/nve#--mirror) and
[`--fetch`](https://github.com/ehmicky/nve#--fetch) CLI flags are available.

```bash
# Prints latest Node.js version
$ nve latest
19.3.0

# Prints latest Node.js 8 version
$ nve 8
8.17.0

# Prints latest Node.js 12, 10 and 8 versions
$ nve 12,10,8
12.22.1
10.24.1
8.17.0
```

# See also

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
  <tbody>
    <tr>
      <td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4?s=100" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/node-version-alias/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/node-version-alias/commits?author=ehmicky" title="Documentation">📖</a></td>
      <td align="center"><a href="https://twitter.com/adrieankhisbe"><img src="https://avatars1.githubusercontent.com/u/2601132?v=4?s=100" width="100px;" alt="Adrien Becchis"/><br /><sub><b>Adrien Becchis</b></sub></a><br /><a href="https://github.com/ehmicky/node-version-alias/commits?author=AdrieanKhisbe" title="Code">💻</a> <a href="https://github.com/ehmicky/node-version-alias/commits?author=AdrieanKhisbe" title="Tests">⚠️</a> <a href="#ideas-AdrieanKhisbe" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://joram.dev"><img src="https://avatars.githubusercontent.com/u/205834?v=4?s=100" width="100px;" alt="Joram van den Boezem"/><br /><sub><b>Joram van den Boezem</b></sub></a><br /><a href="https://github.com/ehmicky/node-version-alias/issues?q=author%3Ahongaar" title="Bug reports">🐛</a></td>
      <td align="center"><a href="http://www.devalias.net/"><img src="https://avatars.githubusercontent.com/u/753891?v=4?s=100" width="100px;" alt="Glenn 'devalias' Grant"/><br /><sub><b>Glenn 'devalias' Grant</b></sub></a><br /><a href="https://github.com/ehmicky/node-version-alias/commits?author=0xdevalias" title="Documentation">📖</a> <a href="#question-0xdevalias" title="Answering Questions">💬</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
