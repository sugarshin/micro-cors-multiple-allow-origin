const cors = require('micro-cors')

module.exports = (options = {}) => {
  const { origin: optionsOrigin } = options
  const multiple = Array.isArray(optionsOrigin)
  if (multiple && optionsOrigin.length === 0) {
    throw new Error('`options.origin` must not be empty')
  }

  return handler => (req, res, ...restArgs) => {
    if (multiple) {
      const { origin } = req.headers
      if (optionsOrigin.includes(origin)) {
        options.origin = origin
      } else {
        options.origin = ' '
      }
    }

    return cors(options)(handler)(req, res, ...restArgs)
  }
}
