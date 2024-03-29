require('dotenv').config()

const path = require('path')
const withSass = require('@zeit/next-sass')
const withSourceMaps = require('@zeit/next-source-maps')()

const withConfig = (config) => {
  return withSourceMaps(withSass(config))
}

module.exports = withConfig({
  env: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    SENTRY_DSN: process.env.SENTRY_DSN
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    })

    config.resolve.alias['~'] = path.resolve(__dirname)

    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    config.resolve.extensions.push('.graphql')
    config.resolve.extensions.push('.scss')

    return config
  }
})
