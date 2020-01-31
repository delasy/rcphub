import React from 'react'
import _ from 'lodash'

import withAuth from '~/hocs/auth'
import { apolloHelpers } from '~/hocs/apollo'

export default _.flowRight(withAuth, (PageComponent) => {
  const withGuest = (props) => {
    return (
      <PageComponent {...props} />
    )
  }

  withGuest.getInitialProps = async (ctx) => {
    if (ctx.user !== null) {
      await apolloHelpers.onSigninRedirect(ctx)
      return {}
    }

    let pageProps = {}

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx)
    }

    return pageProps
  }

  return withGuest
})
