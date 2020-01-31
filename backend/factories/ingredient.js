const { Ingredient } = require('../models')

module.exports = {
  model: Ingredient,
  initializer: async (factory) => {
    const user = await factory.create('user')

    console.log('user=', user.id, user.firstName, user.lastName)

    return {
      userId: user.id
    }
  }
}
