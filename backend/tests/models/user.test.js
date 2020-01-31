/* eslint-env jest */

const { SequelizeUniqueConstraintError } = require('sequelize')

const factory = require('../../factories')

beforeAll(() => {
  return factory.cleanUp()
})

describe('Instance', () => {
  it('Should pass', async (done) => {
    const user = await factory.create('user')

    expect(user).toBeTruthy()

    return done()
  })

  it('Should fail on non-unique email', async (done) => {
    const { email } = await factory.build('user')

    await factory.create('user', { email })

    await expect(factory.create('user', { email })).rejects
      .toThrow(SequelizeUniqueConstraintError)

    return done()
  })
})

describe('Scope Email', () => {
  const User = factory.getFactory('user').Model

  it('Should pass', async (done) => {
    const { email } = await factory.build('user')

    await factory.create('user', { email })

    const user = await User.scope({ method: ['email', email] }).findOne()

    expect(user).toBeTruthy()

    return done()
  })

  it('Should fail on invalid email', async (done) => {
    const user = await User.scope({ method: ['email', 'test@test.com'] })
      .findOne()

    expect(user).toBeNull()

    return done()
  })
})

afterAll(() => {
  return factory.close()
})
