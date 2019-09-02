const {join, resolve} = require()
const {get, set} = require('object-access')
const {isArray, isObject, isString} = require('core-util-is')
const {isAbsolute} = require('is-absolute')

const NextBlock = require('@caviar/next-block')

const {error} = require('./error')

const DEFAULT_PATHS = ['resolve', 'alias']
const RESOLVE_ALIAS_PLUGIN = 'ResolveAliasPlugin'

const createResolveAlias = (type, code) => (alias, from, i) => {
  if (!alias) {
    return false
  }

  if (!isString(alias)) {
    throw error(code, i, alias)
  }

  alias = join(from, alias)

  if (!isAbsolute(alias)) {
    throw error('PATH_CAN_NOT_RESOLVE', i, type, i, type)
  }

  return alias
}

const resolveServerAlias = createResolveAlias('server', 'INVALID_ALIAS_SERVER')
const resolveClientAlias = createResolveAlias('client', 'INVALID_ALIAS_CLIENT')

module.exports = class AliasPlugin {
  constructor (aliases, defaultFrom) {
    if (!isArray(aliases)) {
      throw error('INVALID_ALIASES', aliases)
    }

    this._aliases = aliases.map((alias, i) => {
      if (isString(alias)) {
        alias = {
          id: alias
        }
      } else if (!isObject(alias)) {
        throw error('INVALID_ALIAS', i)
      }

      const {
        id
      } = alias

      let {
        server = id,
        client = id,
        from = defaultFrom
      } = alias

      if (!isString(id)) {
        throw error('INVALID_ALIAS_ID', i, id)
      }

      from = resolve(from)
      server = resolveServerAlias(server, from, i)
      client = resolveClientAlias(client, from, i)

      return {
        id,
        server,
        client
      }
    })
  }

  apply (getHooks) {
    getHooks(NextBlock).webpackConfig.tap(RESOLVE_ALIAS_PLUGIN, (webpack, {
      isServer
    }) => {
      const aliases = get(webpack, DEFAULT_PATHS, {})

      this._aliases.forEach(([{
        id,
        server,
        client
      }]) => {
        const alias = isServer
          ? server
          : client

        if (alias === false) {
          return
        }

        aliases[id] = alias
      })

      set(webpack, DEFAULT_PATHS, aliases)
    })
  }
}
