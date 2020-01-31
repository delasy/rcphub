const bcrypt = require('bcrypt')
const faker = require('faker')

const { User } = require('../models')

module.exports = {
  model: User,
  initializer: () => {
    return {
      firstName: () => {
        return faker.name.firstName()
      },
      lastName: () => {
        return faker.name.lastName()
      },
      email: () => {
        return faker.internet.email().toLowerCase()
      },
      password: () => {
        return bcrypt.hash(faker.internet.password(), 10)
      }
    }
  }
}
