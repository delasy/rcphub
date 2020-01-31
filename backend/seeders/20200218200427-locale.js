const factory = require('../factories')

module.exports = {
  up: () => {
    return factory.createMany('locale', 10)
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('locales', {})
  }
}
