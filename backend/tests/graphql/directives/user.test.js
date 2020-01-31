/* eslint-env jest */

const { ApolloServer, gql } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing')

const factory = require('../../../factories')
const { createSchema } = require('../../../graphql/utils')

const resolvers = {
  Query: {
    test: () => {
      return {
        hello: 'world'
      }
    }
  }
}

const schema = createSchema(typeDefs, resolvers)

beforeAll(() => {
  return factory.cleanUp()
})

describe('GraphQL Directive', () => {
  const TEST = gql`
    query Test {
      test {
        hello
      }
    }
  `

  it('Should pass', async (done) => {
    const apolloServer = new ApolloServer({
      context: async () => {
        const user = await factory.create('user')
        return { user }
      },
      schema: schema
    })

    const { query } = createTestClient(apolloServer)
    const res = await query({ query: TEST })

    expect(res.data).toBeTruthy()
    expect(res.data.test).toBeTruthy()
    expect(res.data.test.hello).toEqual('world')
    expect(res.errors).toBeUndefined()

    return done()
  })

  it('Should fail on unauthorized', async (done) => {
    const apolloServer = new ApolloServer({
      context: () => {
        return {
          user: null
        }
      },
      schema: schema
    })

    const { query } = createTestClient(apolloServer)
    const res = await query({ query: TEST })

    expect(res.data).toBeNull()
    expect(res.errors).toBeTruthy()

    return done()
  })
})

afterAll(() => {
  return factory.close()
})
