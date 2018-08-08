# micro-cors-multiple-allow-origin

[![CircleCI](https://circleci.com/gh/sugarshin/micro-cors-multiple-allow-origin.svg?style=svg&circle-token=6df98fe810b3c5fc49bf7c37b1f42da9cfdcda81)](https://circleci.com/gh/sugarshin/micro-cors-multiple-allow-origin)

CORS for ZEIT's [Micro](https://github.com/zeit/micro).

Add multiple allowed origin.

```bash
yarn add micro-cors-multiple-allow-origin
```

## Usage

```js
const corsMultipleAllowOrigin = require('micro-cors-multiple-allow-origin')
const cors = corsMultipleAllowOrigin({ origin: ['https://github.com', 'https://sugarshin.net'] })
const handler = (req, res) => send(res, 200, 'ok!')
module.exports = cors(handler)
```

### Options

Other options refer to https://github.com/possibilities/micro-cors#options

## License

[MIT][license-url]

© sugarshin

[license-image]: https://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: https://sugarshin.mit-license.org/
