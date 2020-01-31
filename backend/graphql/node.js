const { gql } = require('apollo-server-express')

module.exports.typeDefs = gql`
  interface Node {
    id: ID!
  }
`
