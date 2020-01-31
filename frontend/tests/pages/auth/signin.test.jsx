/* eslint-env jest */

import React from 'react'
import Router from 'next/router'
import faker from 'faker'
import nookies from 'nookies'
import { GraphQLError } from 'graphql'
import { fireEvent, render, screen, wait } from '@testing-library/react'

import AUTHENTICATE_USER from '~/graphql/mutations/authenticate-user'
import ApolloProviderMock from '~/tests/fixtures/apollo-provider-mock'
import AuthSigninPage from '~/pages/auth/signin'

describe('Page', () => {
  it('Should pass', async (done) => {
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const authenticateUser = {
      token: 'test'
    }

    const authenticateUserMock = {
      request: {
        query: AUTHENTICATE_USER,
        variables: {
          input: data
        }
      },
      result: {
        data: { authenticateUser }
      }
    }

    render(
      <ApolloProviderMock mocks={[authenticateUserMock]}>
        <AuthSigninPage />
      </ApolloProviderMock>
    )

    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeEnabled()
    expect(screen.getByLabelText('Email address')).toBeEnabled()
    expect(screen.getByLabelText('Password')).toBeEnabled()

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: data.email }
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: data.password }
    })

    expect(screen.getByLabelText('Email address')).toHaveValue(data.email)
    expect(screen.getByLabelText('Password')).toHaveValue(data.password)

    fireEvent.click(screen.getByText('Submit'))

    expect(screen.getByText('Submit')).toBeDisabled()
    expect(screen.getByLabelText('Email address')).toBeDisabled()
    expect(screen.getByLabelText('Password')).toBeDisabled()

    await wait()

    expect(screen.getByText('Submit')).toBeDisabled()
    expect(screen.getByLabelText('Email address')).toBeDisabled()
    expect(screen.getByLabelText('Password')).toBeDisabled()
    expect(nookies.get().sid).toEqual(authenticateUser.token)
    expect(Router.push).toHaveBeenCalledWith('/account')
    expect(Router.push).toHaveBeenCalledTimes(1)

    return done()
  })

  it('Should show an error when credentials are invalid', async (done) => {
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const errorMessage = 'Invalid email or password'

    const authenticateUserMock = {
      request: {
        query: AUTHENTICATE_USER,
        variables: {
          input: data
        }
      },
      result: {
        errors: [
          new GraphQLError(errorMessage)
        ]
      }
    }

    render(
      <ApolloProviderMock mocks={[authenticateUserMock]}>
        <AuthSigninPage />
      </ApolloProviderMock>
    )

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: data.email }
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: data.password }
    })

    fireEvent.click(screen.getByText('Submit'))

    await wait()

    expect(screen.getByText('Submit')).toBeDisabled()
    expect(screen.getByText(errorMessage)).toHaveTextContent(errorMessage)
    expect(screen.getAllByText(errorMessage)).toHaveLength(1)
    expect(screen.getByLabelText('Email address')).toBeEnabled()
    expect(screen.getByLabelText('Password')).toBeEnabled()

    return done()
  })

  it('Should hide an error when user updates email', async (done) => {
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const errorMessage = 'Invalid email or password'

    const authenticateUserMock = {
      request: {
        query: AUTHENTICATE_USER,
        variables: {
          input: data
        }
      },
      result: {
        errors: [
          new GraphQLError(errorMessage)
        ]
      }
    }

    render(
      <ApolloProviderMock mocks={[authenticateUserMock]}>
        <AuthSigninPage />
      </ApolloProviderMock>
    )

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: data.email }
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: data.password }
    })

    fireEvent.click(screen.getByText('Submit'))

    await wait()

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: faker.internet.email() }
    })

    expect(screen.getByText('Submit')).toBeEnabled()
    expect(screen.queryByText(errorMessage)).toBeNull()

    return done()
  })

  it('Should hide an error when user updates password', async (done) => {
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const errorMessage = 'Invalid email or password'

    const authenticateUserMock = {
      request: {
        query: AUTHENTICATE_USER,
        variables: {
          input: data
        }
      },
      result: {
        errors: [
          new GraphQLError(errorMessage)
        ]
      }
    }

    render(
      <ApolloProviderMock mocks={[authenticateUserMock]}>
        <AuthSigninPage />
      </ApolloProviderMock>
    )

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: data.email }
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: data.password }
    })

    fireEvent.click(screen.getByText('Submit'))

    await wait()

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: faker.internet.password() }
    })

    expect(screen.getByText('Submit')).toBeEnabled()
    expect(screen.queryByText(errorMessage)).toBeNull()

    return done()
  })
})
