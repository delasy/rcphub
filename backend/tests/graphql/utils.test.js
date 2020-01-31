/* eslint-env jest */

const { GraphQLSchema } = require('graphql')
const { gql } = require('apollo-server-express')

const utils = require('../../graphql/utils')

const typeDefs = gql`
  type Query {
    test: Test!
  }

  type Test {
    hello: String!
  }
`

const resolvers = {
  Query: {
    test: () => {
      return {
        hello: 'world'
      }
    }
  }
}

describe('GraphQL Utils', () => {
  test('Should pass', () => {
    const schema = utils.createSchema(typeDefs, resolvers)

    expect(schema).toBeInstanceOf(GraphQLSchema)
  })
})
