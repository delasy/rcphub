module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ingredients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        type: Sequelize.UUID
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
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('ingredients')
  }
}
