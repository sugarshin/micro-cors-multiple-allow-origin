import test from 'ava'
import * as httpMocks from 'node-mocks-http'
import corsMultipleAllowOrigin from '.'

test('add default allow origin header', async t => {
  const cors = corsMultipleAllowOrigin()
  const mockHandler = (req, res) => ({ req, res })
  const req = httpMocks.createRequest()
  const res = httpMocks.createResponse({ req })
  const ret = cors(mockHandler)(req, res)
  t.is(ret.res.getHeader('Access-Control-Allow-Origin'), '*')
})

test('add configured single allow origin header', t => {
  const cors = corsMultipleAllowOrigin({ origin: 'FOO' })
  const mockHandler = (req, res) => ({ req, res })
  const req = httpMocks.createRequest({ headers: { origin: 'FOO' } })
  const res = httpMocks.createResponse({ req })
  const ret = cors(mockHandler)(req, res)
  t.is(ret.res.getHeader('Access-Control-Allow-Origin'), 'FOO')
})

test('add configured multiple allow origin header', async t => {
  const cors = corsMultipleAllowOrigin({ origin: ['FOO', 'BAR'] })
  const mockHandler = (req, res) => ({ req, res })
  const req = httpMocks.createRequest({ headers: { origin: 'BAR' } })
  const res = httpMocks.createResponse({ req })
  const r = cors(mockHandler)(req, res)
  const allowOriginHeader = r.res.getHeader('Access-Control-Allow-Origin')
  t.is(allowOriginHeader, 'BAR')
})

test('not add configured multiple allow origin header', async t => {
  const cors = corsMultipleAllowOrigin({ origin: ['FOO', 'BAR'] })
  const mockHandler = (req, res) => ({ req, res })
  const req = httpMocks.createRequest({ headers: { origin: 'BAZ' } })
  const res = httpMocks.createResponse({ req })
  const r = cors(mockHandler)(req, res)
  const allowOriginHeader = r.res.getHeader('Access-Control-Allow-Origin')
  t.is(allowOriginHeader, ' ')
})
