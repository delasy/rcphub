import React from 'react'

import withSentry from '~/hocs/sentry'

const MyApp = ({ Component, err, pageProps }) => {
  return (
    <Component {...pageProps} err={err} />
  )
}

export default withSentry(MyApp)
