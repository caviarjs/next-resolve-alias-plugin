const {resolve} = require('path')
const {get, set} = require('object-access')
const {isArray, isObject, isString} = require('core-util-is')
const isAbsolute = require('is-absolute')
const resolveFrom = require('resolve-from')
const parseId = require('module-id')

const NextBlock = require('@caviar/next-block')

const {error} = require('./error')

const DEFAULT_PATHS = ['resolve', 'alias']
const RESOLVE_ALIAS_PLUGIN = 'ResolveAliasPlugin'

const isValidFrom = f => isString(f) || f === undefined
const isValidId = id => {
  let parsed

  try {
    parsed = parseId(id)
  } catch (err) {
    return false
  }

  // `id` should not contain version
  return !parsed.version
}

const createResolveAlias = (type, code) => (alias, from, i) => {
  if (!alias) {
    return false
  }

  if (!isString(alias)) {
    throw error(code, i, alias)
  }

  if (isAbsolute(alias)) {
    return alias
  }

  if (!from) {
    throw error('MODULE_CAN_NOT_RESOLVE', alias, i, type, i, type)
  }

  try {
    return resolveFrom(from, alias)
  } catch (err) {
    throw error('ERR_RESOLVE_MODULE', alias, i, type, from, err.stack)
  }
}

const resolveServerAlias = createResolveAlias('server', 'INVALID_ALIAS_SERVER')
const resolveClientAlias = createResolveAlias('client', 'INVALID_ALIAS_CLIENT')

module.exports = class AliasPlugin {
  constructor (aliases, defaultFrom) {
    if (!isArray(aliases)) {
      throw error('INVALID_ALIASES', aliases)
    }

    if (!isValidFrom(defaultFrom)) {
      throw error('INVALID_DEFAULT_FROM', defaultFrom)
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

      if (!isValidId(id)) {
        throw error('INVALID_ALIAS_ID', id, i)
      }

      if (!isValidFrom(from)) {
        throw error('INVALID_ALIAS_FROM', i, from)
      }

      // from and defaultFrom can both be undefined
      from = from && resolve(from)
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
