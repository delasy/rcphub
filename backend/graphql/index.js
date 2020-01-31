const jwt = require('jsonwebtoken')
const {
  AuthenticationError,
  makeExecutableSchema,
  gql
} = require('apollo-server-express')
const _ = require('lodash')

const { User } = require('../models')

module.exports.context = async ({ req }) => {
  const ctx = {
    user: null
  }

  const authorization = req.headers.authorization || ''

  if (authorization === '') {
    return ctx
  }

  const token = authorization.replace('Bearer ', '')

  try {
    const { userId } = await jwt.verify(token, process.env.SECRET)
    const user = await User.findByPk(userId)

    if (user !== null) {
      return {
        ...ctx,
        user: user
      }
    }
  } catch (err) {
  }

  throw new AuthenticationError('Invalid token')
}

const scalars = gql`
  scalar DateTime

  type Mutation
`

const nodes = [
  require('./auth'),
  require('./current-user'),
  require('./ingredient'),
  require('./ingredient-translation'),
  require('./locale'),
  require('./node'),
  require('./user')
]

const directives = {}
const resolvers = []
const typeDefs = [scalars]

for (const node of nodes) {
  if (Object.prototype.hasOwnProperty.call(node, 'directives')) {
    for (const key of Object.keys(node.directives)) {
      directives[key] = node.directives[key]
    }
  }

  if (Object.prototype.hasOwnProperty.call(node, 'resolvers')) {
    resolvers.push(node.resolvers)
  }

  if (Object.prototype.hasOwnProperty.call(node, 'typeDefs')) {
    typeDefs.push(node.typeDefs)
  }
}

module.exports.schema = makeExecutableSchema({
  resolvers: _.merge(...resolvers),
  schemaDirectives: directives,
  typeDefs: typeDefs
})
