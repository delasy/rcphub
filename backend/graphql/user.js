const { gql } = require('apollo-server-express')

module.exports.typeDefs = gql`
  type User implements Node {
    id: ID!
    firstName: String!
    lastName: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
