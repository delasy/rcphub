const factory = require('../factories')

module.exports = {
  up: () => {
    return factory.createMany('ingredientTranslation', 10)
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('ingredient_translations', {})
  }
}
