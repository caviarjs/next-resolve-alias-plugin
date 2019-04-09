const {get, set} = require('object-access')
const {isObject, isString} = require('core-util-is')
const {error} = require('./error')

const DEFAULT_PATHS = ['resolve', 'alias']

const invalidAlias = s => !isString(s) && s !== undefined

module.exports = class AliasPlugin {
  constructor (aliases) {
    if (!isObject(aliases)) {
      throw error('INVALID_ALIASES', aliases)
    }

    this._aliases = []
    Object.keys(aliases).forEach(moduleName => {
      const {
        server,
        client
      } = aliases[moduleName]

      if (invalidAlias(server)) {
        throw error('INVALID_SERVER_ALIAS', server)
      }

      if (invalidAlias(client)) {
        throw error('INVALID_CLIENT_ALIAS', server)
      }

      this._aliases.push([moduleName, server, client])
    })
  }

  apply (lifecycle) {
    lifecycle.hooks.webpackConfig.tap('ResolveAliasPlugin', (webpack, {
      isServer
    }) => {
      const aliases = get(webpack, DEFAULT_PATHS, {})

      this._aliases.forEach(([moduleName, server, client]) => {
        const alias = isServer
          ? server
          : client

        if (!alias) {
          return
        }

        aliases[moduleName] = alias
      })

      set(webpack, DEFAULT_PATHS, aliases)
    })
  }
}
