const fs = require('fs')
const path = require('path')
const { factory: { FactoryGirl } } = require('factory-girl')

const { sequelize } = require('../models')

const factory = new FactoryGirl()

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 &&
      file !== 'index.js' &&
      file.slice(-3) === '.js'
  })
  .map((file) => {
    const factoryItem = require(path.join(__dirname, file))

    factory.define(factoryItem.model.name, factoryItem.model, () => {
      return factoryItem.initializer(factory)
    })
  })

factory.close = (...args) => {
  return sequelize.close(...args)
}

module.exports = factory
