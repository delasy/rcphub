/* eslint-env jest */

import React from 'react'
import Router from 'next/router'
import faker from 'faker'
import nookies from 'nookies'
import { render, screen } from '@testing-library/react'

import GET_CURRENT_USER from '~/graphql/queries/get-current-user'
import ApolloProviderMock, {
  mockApolloClient
} from '~/tests/fixtures/apollo-provider-mock'
import TestPage from '~/tests/fixtures/test-page'
import TestPageWithProps from '~/tests/fixtures/test-page-with-props'
import withGuest from '~/hocs/guest'

describe('Higher-Order Component', () => {
  it('Should pass', async (done) => {
    const WrappedComponent = withGuest(TestPage)
    const apolloClient = mockApolloClient()
    const props = await WrappedComponent.getInitialProps({ apolloClient })

    render(
      <ApolloProviderMock>
        <WrappedComponent {...props} />
      </ApolloProviderMock>
    )

    expect(screen.getByText('Test passed')).toBeInTheDocument()

    return done()
  })

  it('Should pass with props', async (done) => {
    const WrappedComponent = withGuest(TestPageWithProps)
    const apolloClient = mockApolloClient()
    const props = await WrappedComponent.getInitialProps({ apolloClient })

    render(
      <ApolloProviderMock>
        <WrappedComponent {...props} />
      </ApolloProviderMock>
    )

    expect(props.hello).toEqual('world')
    expect(screen.getByText('Test passed')).toBeInTheDocument()

    return done()
  })

  it('Should fail on authorized', async (done) => {
    nookies.set(null, 'sid', 'test')

    const getCurrentUserMock = {
      request: { query: GET_CURRENT_USER },
      result: {
        data: {
          currentUser: {
            id: faker.random.uuid(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email()
          }
        }
      }
    }

    const WrappedComponent = withGuest(TestPage)
    const apolloClient = mockApolloClient([getCurrentUserMock])
    const props = await WrappedComponent.getInitialProps({ apolloClient })

    render(
      <ApolloProviderMock>
        <WrappedComponent {...props} />
      </ApolloProviderMock>
    )

    expect(Router.push).toHaveBeenCalledWith('/account')
    expect(Router.push).toHaveBeenCalledTimes(1)

    nookies.destroy(null, 'sid')
    return done()
  })
})
