const {Errors} = require('err-object')

const {error, E} = new Errors()

const invalidAlias = t =>
  `${t} alias must be a module name or path string, but got %s`

E('INVALID_ALIASES', 'aliases must be an object, bug got %s')
E('INVALID_SERVER_ALIAS', invalidAlias('server'))
E('INVALID_CLIENT_ALIAS', invalidAlias('client'))

module.exports = {
  error
}
