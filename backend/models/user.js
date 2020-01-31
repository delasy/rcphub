const Sequelize = require('sequelize')

class User extends Sequelize.Model {
  static associate (models) {
    User.hasMany(models.Ingredient)
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
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 255]
        }
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 255]
        }
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: 60
        }
      }
    }, {
      indexes: [
        {
          fields: ['email'],
          name: 'users_email_ukey',
          unique: true
        }
      ],
      modelName: 'user',
      paranoid: true,
      sequelize: sequelize,

      scopes: {
        email: (email) => {
          return {
            where: {
              email
            }
          }
        }
      }
    })
  }
}

module.exports = User
