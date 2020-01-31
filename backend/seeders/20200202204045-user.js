const factory = require('../factories')

module.exports = {
  up: () => {
    return factory.createMany('user', 10)
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', {})
  }
}
