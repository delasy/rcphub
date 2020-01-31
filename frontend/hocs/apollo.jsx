import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nookies from 'nookies'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'

export const apolloHelpers = {
  getToken: (ctx) => {
    const token = nookies.get(ctx).sid
    return token ? 'Bearer ' + token : ''
  },
  onRedirect: async (ctx, url) => {
    if (ctx && ctx.req && ctx.res) {
      ctx.res.writeHead(301, { Location: url })
      ctx.res.end()
    } else {
      await Router.push(url)
    }
  },
  onSignin: async (ctx, token) => {
    nookies.set(ctx, 'sid', token, {
      maxAge: 28 * 24 * 60 * 60,
      path: '/'
    })

    await apolloHelpers.onSigninRedirect(ctx)
  },
  onSigninRedirect: async (ctx) => {
    await apolloHelpers.onRedirect(ctx, '/account')
  },
  onSignout: async (ctx) => {
    nookies.destroy(ctx, 'sid')

    if (ctx && ctx.apolloClient) {
      await ctx.apolloClient.resetStore()
    }

    await apolloHelpers.onSignoutRedirect(ctx)
  },
  onSignoutRedirect: async (ctx) => {
    await apolloHelpers.onRedirect(ctx, '/auth/signin')
  }
}

const createApolloClient = (ctx, initialState) => {
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    link: createHttpLink({
      credentials: 'same-origin',
      fetch: fetch,
      headers: {
        authorization: apolloHelpers.getToken(ctx)
      },
      uri: process.env.GRAPHQL_ENDPOINT
    }),
    ssrMode: typeof window === 'undefined'
  })
}

let globalApolloClient = null

const initApolloClient = (ctx, initialState) => {
  if (typeof window === 'undefined') {
    return createApolloClient(ctx, initialState)
  } else if (globalApolloClient === null) {
    globalApolloClient = createApolloClient(ctx, initialState)
  }

  return globalApolloClient
}

export default (PageComponent) => {
  const withApollo = ({ apolloClient, apolloState, ...props }) => {
    const client = apolloClient || initApolloClient(null, apolloState)

    return (
      <ApolloProvider client={client}>
        <PageComponent {...props} />
      </ApolloProvider>
    )
  }

  withApollo.getInitialProps = async (ctx) => {
    ctx.apolloClient = ctx.apolloClient || initApolloClient(ctx)

    let pageProps = {}

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx)
    }

    return {
      ...pageProps,
      apolloState: ctx.apolloClient.cache.extract()
    }
  }

  return withApollo
}
