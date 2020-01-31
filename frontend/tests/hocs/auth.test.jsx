/* eslint-env jest */

import React from 'react'
import faker from 'faker'
import nookies from 'nookies'
import { render, screen } from '@testing-library/react'

import GET_CURRENT_USER from '~/graphql/queries/get-current-user'
import ApolloProviderMock, {
  mockApolloClient
} from '~/tests/fixtures/apollo-provider-mock'
import TestPage from '~/tests/fixtures/test-page'
import TestPageWithProps from '~/tests/fixtures/test-page-with-props'
import withAuth from '~/hocs/auth'
import { GraphQLError } from 'graphql'

describe('Higher-Order Component', () => {
  it('Should pass', async (done) => {
    nookies.set(null, 'sid', 'test')

    const currentUser = {
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email()
    }

    const resultHandler = jest.fn(() => {
      return {
        data: { currentUser }
      }
    })

    const getCurrentUserMock = {
      request: { query: GET_CURRENT_USER },
      result: resultHandler
    }

    const WrappedComponent = withAuth(TestPage)
    const apolloClient = mockApolloClient([getCurrentUserMock])
    const props = await WrappedComponent.getInitialProps({ apolloClient })

    render(
      <ApolloProviderMock>
        <WrappedComponent {...props} />
      </ApolloProviderMock>
    )

    expect(props.user).toEqual(currentUser)
    expect(resultHandler).toHaveBeenCalledWith()
    expect(resultHandler).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Test passed')).toBeInTheDocument()

    nookies.destroy(null, 'sid')
    return done()
  })

  it('Should pass with props', async (done) => {
    nookies.set(null, 'sid', 'test')

    const currentUser = {
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email()
    }

    const resultHandler = jest.fn(() => {
      return {
        data: { currentUser }
      }
    })

    const getCurrentUserMock = {
      request: { query: GET_CURRENT_USER },
      result: resultHandler
    }

    const WrappedComponent = withAuth(TestPageWithProps)
    const apolloClient = mockApolloClient([getCurrentUserMock])
    const props = await WrappedComponent.getInitialProps({ apolloClient })

    render(
      <ApolloProviderMock>
        <WrappedComponent {...props} />
      </ApolloProviderMock>
    )

    expect(props.hello).toEqual('world')
    expect(props.user).toEqual(currentUser)
    expect(resultHandler).toHaveBeenCalledWith()
    expect(resultHandler).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Test passed')).toBeInTheDocument()

    nookies.destroy(null, 'sid')
    return done()
  })

  it('Should pass on unauthorized', async (done) => {
    const WrappedComponent = withAuth(TestPage)
    const props = await WrappedComponent.getInitialProps({})

    render(
      <ApolloProviderMock>
        <WrappedComponent {...props} />
      </ApolloProviderMock>
    )

    expect(props.user).toBeNull()
    expect(screen.getByText('Test passed')).toBeInTheDocument()

    return done()
  })

  it('Should fail on error', async (done) => {
    nookies.set(null, 'sid', 'test')

    const resultHandler = jest.fn(() => {
      return {
        errors: [
          new GraphQLError('Invalid email or password')
        ]
      }
    })

    const getCurrentUserMock = {
      request: { query: GET_CURRENT_USER },
      result: resultHandler
    }

    const WrappedComponent = withAuth(TestPage)
    const apolloClient = mockApolloClient([getCurrentUserMock])
    const props = await WrappedComponent.getInitialProps({ apolloClient })

    render(
      <ApolloProviderMock>
        <WrappedComponent {...props} />
      </ApolloProviderMock>
    )

    expect(props.user).toBeNull()
    expect(resultHandler).toHaveBeenCalledWith()
    expect(resultHandler).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Test passed')).toBeInTheDocument()

    return done()
  })
})
