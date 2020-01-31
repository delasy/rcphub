const { gql } = require('apollo-server-express')

const { Locale } = require('../models')

module.exports.typeDefs = gql`
  type Locale implements Node {
    id: ID!
    country: String!
    language: String!
    code: String!
    sortOrder: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    locales: [Locale!]!
  }
`

module.exports.resolvers = {
  Query: {
    locales: () => {
      return Locale.findAll()
    }
  }
}
