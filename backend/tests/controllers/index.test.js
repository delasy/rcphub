/* eslint-env jest */

const supertest = require('supertest')

const app = require('../../app')

const request = supertest(app)

describe('GET 404 Not Found', () => {
  it('Should pass', async (done) => {
    const res = await request.get('/not-found')

    expect(res.statusCode).toEqual(404)
    expect(res.text).toEqual('404 Not Found')

    return done()
  })
})

describe('POST 404 Not Found', () => {
  it('Should pass', async (done) => {
    const res = await request.post('/not-found')

    expect(res.statusCode).toEqual(404)
    expect(res.text).toEqual('404 Not Found')

    return done()
  })
})
