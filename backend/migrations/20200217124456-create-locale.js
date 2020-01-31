const uuidv4 = require('uuid/v4')

const locales = require('../config/locales')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable('locales', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        country: {
          allowNull: false,
          type: Sequelize.STRING
        },
        language: {
          allowNull: false,
          type: Sequelize.STRING
        },
        code: {
          allowNull: false,
          type: Sequelize.STRING(5)
        },
        sort_order: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deleted_at: {
          allowNull: true,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction })

      await queryInterface.addConstraint('locales', ['country', 'language'], {
        name: 'locales_country_language_ukey',
        transaction: transaction,
        type: 'unique'
      })

      await queryInterface.addConstraint('locales', ['code'], {
        name: 'locales_code_ukey',
        transaction: transaction,
        type: 'unique'
      })

      const localesSQL = locales
        .map((locale) => {
          if (!['ru-ru', 'uk-ua', 'en-us'].includes(locale.code)) {
            return
          }

          return {
            ...locale,
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date()
          }
        })
        .filter(Boolean)

      await queryInterface.bulkInsert('locales', localesSQL, {
        transaction: transaction
      })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('locales')
  }
}
