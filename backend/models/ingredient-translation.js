const Sequelize = require('sequelize')

class IngredientTranslation extends Sequelize.Model {
  static associate (models) {
    IngredientTranslation.belongsTo(models.Ingredient)
    IngredientTranslation.belongsTo(models.Locale)
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
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 255]
        }
      }
    }, {
      indexes: [
        {
          fields: ['locale_id', 'name'],
          name: 'ingredient_translations_locale_id_name_ukey',
          unique: true
        }
      ],
      modelName: 'ingredientTranslation',
      paranoid: true,
      sequelize: sequelize
    })
  }
}

module.exports = IngredientTranslation
