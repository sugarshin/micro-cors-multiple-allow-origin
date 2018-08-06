const cors = require('micro-cors')

module.exports = (options = {}) => {
  const multiple = Array.isArray(options.origin)
  if (multiple && options.origin.length === 0) {
    throw Error('`options.origin` must not be empty')
  }

  return handler => (req, res, ...restArgs) => {
    const { origin: optionsOrigin } = options
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
