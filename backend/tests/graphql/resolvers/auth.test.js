/* eslint-env jest */

const bcrypt = require('bcrypt')
const faker = require('faker')
const { ApolloServer, gql } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing')

const GraphQLSchema = require('../../../graphql')
const factory = require('../../../factories')

beforeAll(() => {
  return factory.cleanUp()
})

describe('GraphQL Mutation SignInUser', () => {
  const SIGN_IN_USER = gql`
    mutation SignInUser ($input: SignInInput!) {
      signIn (input: $input) {
        token
      }
    }
  `

  it('Should pass', async (done) => {
    const password = faker.internet.password()
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await factory.create('user', { password: passwordHash })

    const apolloServer = new ApolloServer({
      ...GraphQLSchema,
      context: () => {
        return {
          user: null
        }
      }
    })

    const { mutate } = createTestClient(apolloServer)

    const res = await mutate({
      mutation: SIGN_IN_USER,
      variables: {
        input: {
          email: user.email,
          password: password
        }
      }
    })

    expect(res.data).toBeTruthy()
    expect(res.data.signIn).toBeTruthy()
    expect(res.errors).toBeUndefined()

    return done()
  })

  it('Should fail on invalid email', async (done) => {
    const apolloServer = new ApolloServer({
      ...GraphQLSchema,
      context: () => {
        return {
          user: null
        }
      }
    })

    const { mutate } = createTestClient(apolloServer)

    const res = await mutate({
      mutation: SIGN_IN_USER,
      variables: {
        input: {
          email: 'test@test.com',
          password: 'password'
        }
      }
    })

    expect(res.data).toBeNull()
    expect(res.errors).toBeTruthy()

    return done()
  })

  it('Should fail on invalid password', async (done) => {
    const user = await factory.create('user')

    const apolloServer = new ApolloServer({
      ...GraphQLSchema,
      context: () => {
        return {
          user: null
        }
      }
    })

    const { mutate } = createTestClient(apolloServer)

    const res = await mutate({
      mutation: SIGN_IN_USER,
      variables: {
        input: {
          email: user.email,
          password: 'password'
        }
      }
    })

    expect(res.data).toBeNull()
    expect(res.errors).toBeTruthy()

    return done()
  })
})

afterAll(() => {
  return factory.close()
})
