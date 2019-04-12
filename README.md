[![Build Status](https://travis-ci.org/kaelzhang/caviar-plugin-resolve-alias.svg?branch=master)](https://travis-ci.org/kaelzhang/caviar-plugin-resolve-alias)
[![Coverage](https://codecov.io/gh/kaelzhang/caviar-plugin-resolve-alias/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/caviar-plugin-resolve-alias)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/caviar-plugin-resolve-alias?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/caviar-plugin-resolve-alias)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/@caviar/plugin-resolve-alias.svg)](http://badge.fury.io/js/@caviar/plugin-resolve-alias)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/@caviar/plugin-resolve-alias.svg)](https://www.npmjs.org/package/@caviar/plugin-resolve-alias)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/caviar-plugin-resolve-alias.svg)](https://david-dm.org/kaelzhang/caviar-plugin-resolve-alias)
-->

# @caviar/plugin-resolve-alias

Caviar plugin to define module resolving aliases for both server side and client side

## Install

```sh
$ npm i @caviar/plugin-resolve-alias
```

## Usage

caviar.config.js

```js
const AliasPlugin = require('@caviar/plugin-resolve-alias')

module.exports = {
  plugins: [
    new AliasPlugin({
      fetch: {
        server: 'node-fetch',
        client: 'fetch-ponyfill'
      }
    })
  ],
  ...
}
```

The code above will set `webpack.output.resolve.alias.fetch` as

- `'node-fetch'` in server side
- and `'fetch-ponyfill'` in client side

## License

MIT
