const Sequelize = require('sequelize')

class Ingredient extends Sequelize.Model {
  static associate (models) {
    Ingredient.belongsTo(models.User)
    Ingredient.hasMany(models.IngredientTranslation)
  }

  static init (sequelize, DataTypes) {
    return super.init({
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: 4
        }
      }
    }, {
      modelName: 'ingredient',
      paranoid: true,
      sequelize: sequelize
    })
  }
}

module.exports = Ingredient
