require('dotenv').config()

const restOfConfig = {
  dialect: 'postgres',
  migrationStoragePath: 'sequelize',
  migrationStorageTableName: 'sequelize_migrations',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_seeders',

  define: {
    underscored: true
  }
}

module.exports = {
  development: {
    ...restOfConfig,
    username: 'root',
    password: null,
    database: 'rcphub_dev',
    host: '127.0.0.1'
  },
  test: {
    ...restOfConfig,
    logging: false,
    username: 'root',
    password: null,
    database: 'rcphub_test',
    host: '127.0.0.1'
  },
  production: {
    ...restOfConfig,
    logging: false,
    use_env_variable: 'DATABASE_URL'
  }
}
