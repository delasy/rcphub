const { gql } = require('apollo-server-express')

module.exports.typeDefs = gql`
  type CurrentUser implements Node {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    currentUser: CurrentUser! @user
  }
`

module.exports.resolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      return context.user
    }
  }
}
