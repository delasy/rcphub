require('dotenv').config()

const Sentry = require('@sentry/node')
const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const { ApolloServer } = require('apollo-server-express')

const GraphQLSchema = require('./graphql')
const controllers = require('./controllers')
const project = require('./package')

const apolloServer = new ApolloServer(GraphQLSchema)
const app = express()

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV === 'production'
    ? 'Production'
    : process.env.NODE_ENV === 'test' ? 'Staging' : 'Development',
  release: project.name + '@' + project.version
})

app.use(Sentry.Handlers.requestHandler())
app.use(helmet())
app.use(express.static('public'))

apolloServer.applyMiddleware({ app })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(controllers)
app.use(Sentry.Handlers.errorHandler())

if (process.env.NODE_ENV !== 'test') {
  const httpServer = app.listen(process.env.PORT || 8083)
  app.set('httpServer', httpServer)
}

module.exports = app
