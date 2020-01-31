/* eslint-env jest */

const { ApolloServer, gql } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing')

const GraphQLSchema = require('../../../graphql')
const factory = require('../../../factories')

beforeAll(() => {
  return factory.cleanUp()
})

describe('GraphQL Query GetCurrentUser', () => {
  const GET_CURRENT_USER = gql`
    query GetCurrentUser {
      currentUser {
        id
        firstName
        lastName
        email
        createdAt
        deletedAt
        updatedAt
      }
    }
  `

  it('Should pass', async (done) => {
    const apolloServer = new ApolloServer({
      ...GraphQLSchema,
      context: async () => {
        const user = await factory.create('user')
        return { user }
      }
    })

    const { query } = createTestClient(apolloServer)
    const res = await query({ query: GET_CURRENT_USER })

    expect(res.data).toBeTruthy()
    expect(res.data.currentUser).toBeTruthy()
    expect(res.errors).toBeUndefined()

    return done()
  })

  it('Should fail on unauthorized', async (done) => {
    const apolloServer = new ApolloServer({
      ...GraphQLSchema,
      context: () => {
        return {
          user: null
        }
      }
    })

    const { query } = createTestClient(apolloServer)
    const res = await query({ query: GET_CURRENT_USER })

    expect(res.data).toBeNull()
    expect(res.errors).toBeTruthy()

    return done()
  })
})

afterAll(() => {
  return factory.close()
})
