const faker = require('faker')

const { IngredientTranslation } = require('../models')

module.exports = {
  model: IngredientTranslation,
  initializer: async (factory) => {
    const ingredient = await factory.create('ingredient')
    const locale = await factory.create('locale')

    return {
      ingredientId: ingredient.id,
      localeId: locale.id,
      name: faker.commerce.productName()
    }
  }
}
