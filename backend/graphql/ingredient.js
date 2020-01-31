const { gql } = require('apollo-server-express')

module.exports.typeDefs = gql`
  type Ingredient implements Node {
    id: ID!
    translations: [IngredientTranslation!]!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    ingredients: [Ingredient!]! @user
  }
`
