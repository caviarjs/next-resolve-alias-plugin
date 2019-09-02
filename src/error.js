const {Errors} = require('err-object')

const {error, E, TE} = new Errors()

TE('INVALID_ALIASES', 'aliases must be an array of objects')

TE('INVALID_DEFAULT_FROM', 'defaultFrom must be a string or undefined')

TE('INVALID_ALIAS', 'aliases[i] must be an object or a string')

TE('INVALID_ALIAS_ID', 'aliases[%s].id must be a string')

TE('INVALID_ALIAS_FROM', 'aliases[%s].from must be a string or undefined')

TE('INVALID_ALIAS_SERVER',
  'aliases[%s].server must be a string or false if specified')

TE('INVALID_ALIAS_CLIENT',
  'aliases[%s].client must be a string or false if specified')

E('PATH_CAN_NOT_RESOLVE', `aliases[%s].%s could not be resolved as an absolute path, you should:
  - specify defaultFrom
  - specify aliases[%s].from
  - provide %s as an absolute path
`)

E('ERR_RESOLVE_PATH', `aliases[%s].%s could not be resolved from "%s", reason:
%s`)

module.exports = {
  error
}
