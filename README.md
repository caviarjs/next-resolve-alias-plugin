[![Build Status](https://travis-ci.org/kaelzhang/caviar-plugin-resolve-alias.svg?branch=master)](https://travis-ci.org/kaelzhang/caviar-plugin-resolve-alias)
[![Coverage](https://codecov.io/gh/kaelzhang/caviar-plugin-resolve-alias/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/caviar-plugin-resolve-alias)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/caviar-plugin-resolve-alias?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/caviar-plugin-resolve-alias)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/@caviar/next-resolve-alias-plugin.svg)](http://badge.fury.io/js/@caviar/next-resolve-alias-plugin)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/@caviar/next-resolve-alias-plugin.svg)](https://www.npmjs.org/package/@caviar/next-resolve-alias-plugin)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/caviar-plugin-resolve-alias.svg)](https://david-dm.org/kaelzhang/caviar-plugin-resolve-alias)
-->

# @caviar/next-resolve-alias-plugin

Caviar plugin to define module resolving aliases for both server side and client side

## Install

```sh
$ npm i @caviar/next-resolve-alias-plugin
```

## Usage

caviar.config.js

```js
const AliasPlugin = require('@caviar/next-resolve-alias-plugin')

module.exports = {
  caviar: {
    plugins: [
      new AliasPlugin([{
        id
      }]),
      ...
    ]
  },
  ...
}
```

The code above will set `webpack.output.resolve.alias.fetch` as

- `'node-fetch'` in server side
- and `'fetch-ponyfill'` in client side

## new AliasPlugin(aliases, from?)

- **aliases** `Array<Alias | string>`
- **from?** `path`

```ts
interface Alias {
  id: string
  server?: string = id | false
  client?: string = id | false
  from?: string
}
```

## License

MIT
