module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable('ingredient_translations', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        ingredient_id: {
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'ingredients',
            key: 'id'
          },
          type: Sequelize.UUID
        },
        locale_id: {
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'locales',
            key: 'id'
          },
          type: Sequelize.UUID
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
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

      await queryInterface.addConstraint('ingredient_translations', [
        'locale_id',
        'name'
      ], {
        name: 'ingredient_translations_locale_id_name_ukey',
        transaction: transaction,
        type: 'unique'
      })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('ingredient_translations')
  }
}
