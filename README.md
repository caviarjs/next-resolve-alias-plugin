[![Build Status](https://travis-ci.org/kaelzhang/roe-plugin-resolve-alias.svg?branch=master)](https://travis-ci.org/kaelzhang/roe-plugin-resolve-alias)
[![Coverage](https://codecov.io/gh/kaelzhang/roe-plugin-resolve-alias/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/roe-plugin-resolve-alias)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/roe-plugin-resolve-alias?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/roe-plugin-resolve-alias)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/roe-plugin-resolve-alias.svg)](http://badge.fury.io/js/roe-plugin-resolve-alias)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/roe-plugin-resolve-alias.svg)](https://www.npmjs.org/package/roe-plugin-resolve-alias)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/roe-plugin-resolve-alias.svg)](https://david-dm.org/kaelzhang/roe-plugin-resolve-alias)
-->

# roe-plugin-resolve-alias

Roe plugin to define module resolving aliases for both server side and client side

## Install

```sh
$ npm i roe-plugin-resolve-alias
```

## Usage

roe.config.js

```js
const AliasPlugin = require('roe-plugin-resolve-alias')

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
