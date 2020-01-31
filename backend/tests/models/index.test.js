/* eslint-env jest */

describe('Sequelize config', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('Should pass', async (done) => {
    process.env.NODE_ENV = ''

    const { sequelize } = require('../../models')

    expect(sequelize.options.dialect).toEqual('postgres')
    expect(sequelize.config.database).toEqual('rcphub_dev')
    expect(sequelize.config.host).toEqual('127.0.0.1')

    await sequelize.close()

    return done()
  })

  it('Should pass in development environment', async (done) => {
    process.env.NODE_ENV = 'development'

    const { sequelize } = require('../../models')

    expect(sequelize.options.dialect).toEqual('postgres')
    expect(sequelize.config.database).toEqual('rcphub_dev')
    expect(sequelize.config.host).toEqual('127.0.0.1')

    await sequelize.close()

    return done()
  })

  it('Should pass in test environment', async (done) => {
    process.env.NODE_ENV = 'test'

    const { sequelize } = require('../../models')

    expect(sequelize.options.dialect).toEqual('postgres')
    expect(sequelize.config.database).toEqual('rcphub_test')
    expect(sequelize.config.host).toEqual('127.0.0.1')

    await sequelize.close()

    return done()
  })

  it('Should pass in production environment', async (done) => {
    process.env.DATABASE_URL = 'postgres://127.0.0.1/rcphub_prod'
    process.env.NODE_ENV = 'production'

    const { sequelize } = require('../../models')

    expect(sequelize.options.dialect).toEqual('postgres')
    expect(sequelize.config.database).toEqual('rcphub_prod')
    expect(sequelize.config.host).toEqual('127.0.0.1')

    await sequelize.close()

    return done()
  })
})
