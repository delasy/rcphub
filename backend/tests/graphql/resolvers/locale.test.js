/* eslint-env jest */

const { ApolloServer, gql } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing')

const GraphQLSchema = require('../../../graphql')
const factory = require('../../../factories')

beforeAll(() => {
  return factory.cleanUp()
})

describe('GraphQL Query GetLocales', () => {
  const GET_LOCALES = gql`
    query GetLocales {
      locales {
        id
        country
        language
        code
        sortOrder
        createdAt
        deletedAt
        updatedAt
      }
    }
  `

  it('Should pass on authorized', async (done) => {
    const apolloServer = new ApolloServer({
      ...GraphQLSchema,
      context: async () => {
        const user = await factory.create('user')
        return { user }
      }
    })

    const { query } = createTestClient(apolloServer)
    const res = await query({ query: GET_LOCALES })

    expect(res.data).toBeTruthy()
    expect(res.data.locales).toBeTruthy()
    expect(res.errors).toBeUndefined()

    return done()
  })

  it('Should pass on unauthorized', async (done) => {
    const apolloServer = new ApolloServer({
      ...GraphQLSchema,
      context: () => {
        return {
          user: null
        }
      }
    })

    const { query } = createTestClient(apolloServer)
    const res = await query({ query: GET_LOCALES })

    expect(res.data).toBeTruthy()
    expect(res.data.locales).toBeTruthy()
    expect(res.errors).toBeUndefined()

    return done()
  })
})

afterAll(() => {
  return factory.close()
})
