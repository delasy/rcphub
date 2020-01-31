/* eslint-env jest */

describe('App', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('Should pass in development environment', () => {
    process.env.NODE_ENV = 'development'

    const app = require('../app')
    const httpServer = app.get('httpServer')

    expect(httpServer).toBeTruthy()

    httpServer.close()
  })

  it('Should pass in production environment', () => {
    process.env.DATABASE_URL = 'postgres://127.0.0.1/rcphub_test'
    process.env.NODE_ENV = 'production'

    const app = require('../app')
    const httpServer = app.get('httpServer')

    expect(httpServer).toBeTruthy()

    httpServer.close()
  })

  it('Should pass in test environment', () => {
    process.env.NODE_ENV = 'test'

    const app = require('../app')

    expect(app.get('httpServer')).toBeUndefined()
  })
})
