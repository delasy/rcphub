const { gql } = require('apollo-server-express')

module.exports.typeDefs = gql`
  type IngredientTranslation implements Node {
    id: ID!
    ingredient: Ingredient!
    locale: Locale!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
