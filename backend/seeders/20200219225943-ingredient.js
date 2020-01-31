const factory = require('../factories')

module.exports = {
  up: () => {
    return factory.createMany('ingredient', 10)
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('ingredients', {})
  }
}
