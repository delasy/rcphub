const faker = require('faker')

const { Locale } = require('../models')

let lastSortOrder = 250

module.exports = {
  model: Locale,
  initializer: () => {
    const countryCode = faker.address.countryCode()
    const languageCode = faker.random.locale()

    return {
      country: faker.address.country(),
      language: faker.locales[languageCode].title,
      code: (languageCode.substr(0, 2) + '-' + countryCode).toLowerCase(),
      sortOrder: lastSortOrder++
    }
  }
}
