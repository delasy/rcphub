const Sequelize = require('sequelize')

class Locale extends Sequelize.Model {
  static associate (models) {
    Locale.hasMany(models.IngredientTranslation)
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
      country: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 255]
        }
      },
      language: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 255]
        }
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: 5
        }
      },
      sortOrder: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    }, {
      indexes: [
        {
          fields: ['country', 'language'],
          name: 'locales_country_language_ukey',
          unique: true
        },
        {
          fields: ['code'],
          name: 'locales_code_ukey',
          unique: true
        }
      ],
      modelName: 'locale',
      paranoid: true,
      sequelize: sequelize
    })
  }
}

module.exports = Locale
