import React from 'react'

import TestPage from '~/tests/fixtures/test-page'

const TestPageWithProps = (props) => {
  return (
    <TestPage {...props} />
  )
}

TestPageWithProps.getInitialProps = async () => {
  return {
    hello: 'world'
  }
}

export default TestPageWithProps
