/* eslint-env jest */

const { AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')

const factory = require('../../factories')
const { context: createContext } = require('../../graphql')

beforeAll(() => {
  return factory.cleanUp()
})

describe('GraphQL Context', () => {
  it('Should pass', async (done) => {
    const { id: userId } = await factory.create('user')
    const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: '7d' })

    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const ctx = await createContext({ req })

    expect(ctx).toBeTruthy()
    expect(ctx.user).toBeTruthy()

    return done()
  })

  it('Should pass on unauthorized', async (done) => {
    const req = {
      headers: {}
    }

    const ctx = await createContext({ req })

    expect(ctx).toBeTruthy()
    expect(ctx.user).toBeNull()

    return done()
  })

  it('Should fail on invalid token', async (done) => {
    const req = {
      headers: {
        authorization: 'Bearer test'
      }
    }

    await expect(createContext({ req })).rejects
      .toThrow(AuthenticationError)

    return done()
  })

  it('Should fail on invalid user', async (done) => {
    const { id: userId } = await factory.build('user')
    const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: '7d' })

    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    await expect(createContext({ req })).rejects
      .toThrow(AuthenticationError)

    return done()
  })
})

afterAll(() => {
  return factory.close()
})
