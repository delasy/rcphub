/* eslint-env jest */

const { SequelizeUniqueConstraintError } = require('sequelize')

const factory = require('../../factories')

beforeAll(() => {
  return factory.cleanUp()
})

describe('Instance', () => {
  it('Should pass', async (done) => {
    const locale = await factory.create('locale')

    expect(locale).toBeTruthy()

    return done()
  })

  it('Should fail on non-unique code', async (done) => {
    const { code } = await factory.build('locale')

    await factory.create('locale', { code })

    await expect(factory.create('locale', { code })).rejects
      .toThrow(SequelizeUniqueConstraintError)

    return done()
  })

  it('Should fail on non-unique country and language', async (done) => {
    const { country, language } = await factory.build('locale')

    await factory.create('locale', { country, language })

    await expect(factory.create('locale', { country, language })).rejects
      .toThrow(SequelizeUniqueConstraintError)

    return done()
  })
})

afterAll(() => {
  return factory.close()
})
