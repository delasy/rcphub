// TODO Merege into user.js

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
  ForbiddenError,
  SchemaDirectiveVisitor,
  ValidationError,
  gql
} = require('apollo-server-express')

const { User } = require('../models')

module.exports.typeDefs = gql`
  directive @guest on FIELD_DEFINITION
  directive @user on FIELD_DEFINITION

  input SignInInput {
    email: String!
    password: String!
  }

  type SignInPayload {
    token: String!
  }

  extend type Mutation {
    signIn (input: SignInInput!): SignInPayload! @guest
  }
`

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve } = field

    field.resolve = function (root, args, context, info) {
      if (context.user !== null) {
        throw new ForbiddenError('Authorized')
      }

      return resolve.call(this, root, args, context, info)
    }
  }
}

class UserDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve } = field

    field.resolve = function (root, args, context, info) {
      if (context.user === null) {
        throw new ForbiddenError('Unauthorized')
      }

      return resolve.call(this, root, args, context, info)
    }
  }
}

module.exports.directives = {
  guest: GuestDirective,
  user: UserDirective
}

module.exports.resolvers = {
  Mutation: {
    signIn: async (parent, args) => {
      const { email, password } = args.input
      const user = await User.scope({ method: ['email', email] }).findOne()

      if (user === null) {
        throw new ValidationError('Invalid email or password')
      }

      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (!passwordsMatch) {
        throw new ValidationError('Invalid email or password')
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
        expiresIn: '7d'
      })

      return {
        token
      }
    }
  }
}
