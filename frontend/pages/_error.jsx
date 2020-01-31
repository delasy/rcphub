import React from 'react'
import NextError from 'next/error'
import * as Sentry from '@sentry/node'

const MyError = ({ err, hasGetInitialPropsRun, statusCode }) => {
  if (typeof err !== 'undefined' && hasGetInitialPropsRun !== true) {
    Sentry.captureException(err)
  }

  return (
    <NextError statusCode={statusCode} />
  )
}

MyError.getInitialProps = async ({ asPath, err, res }) => {
  const initialProps = await NextError.getInitialProps({ err, res })

  initialProps.hasGetInitialPropsRun = true

  if (typeof res !== 'undefined' && res.statusCode === 404) {
    return { statusCode: res.statusCode }
  } else if (typeof err === 'undefined') {
    err = new Error(`MyError.getInitialProps missing data at path: ${asPath}`)
  }

  Sentry.captureException(err)
  return initialProps
}

export default MyError
