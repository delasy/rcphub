/* eslint-env jest */

import React from 'react'
import Router from 'next/router'
import nookies from 'nookies'
import { render, screen } from '@testing-library/react'

import TestPage from '~/tests/fixtures/test-page'
import TestPageWithProps from '~/tests/fixtures/test-page-with-props'
import withApollo, { apolloHelpers } from '~/hocs/apollo'

describe('Higher-Order Component', () => {
  it('Should pass', async (done) => {
    const WrappedComponent = withApollo(TestPage)
    const props = await WrappedComponent.getInitialProps({})

    render(
      <WrappedComponent {...props} />
    )

    expect(screen.getByText('Test passed')).toBeInTheDocument()

    return done()
  })

  it('Should pass in node', async (done) => {
    const windowSpy = jest.spyOn(global, 'window', 'get')

    windowSpy.mockImplementation(() => {
      return undefined
    })

    const WrappedComponent = withApollo(TestPageWithProps)
    const props = await WrappedComponent.getInitialProps({})

    expect(props.hello).toEqual('world')

    windowSpy.mockRestore()
    return done()
  })

  it('Should pass with props', async (done) => {
    const WrappedComponent = withApollo(TestPageWithProps)
    const props = await WrappedComponent.getInitialProps({})

    render(
      <WrappedComponent {...props} />
    )

    expect(props.hello).toEqual('world')
    expect(screen.getByText('Test passed')).toBeInTheDocument()

    return done()
  })
})

describe('Apollo Helper getToken', () => {
  it('Should pass', () => {
    expect(apolloHelpers.getToken()).toEqual('')
  })

  it('Should pass with ctx', () => {
    const ctx = {
      req: {
        headers: {
          cookie: ''
        }
      }
    }

    expect(apolloHelpers.getToken(ctx)).toEqual('')
  })

  it('Should pass with token', () => {
    nookies.set(null, 'sid', 'test')
    expect(apolloHelpers.getToken()).toEqual('Bearer test')
  })

  it('Should pass with token with ctx', () => {
    const ctx = {
      req: {
        headers: {
          cookie: ''
        }
      }
    }

    nookies.set(ctx, 'sid', 'test')

    expect(apolloHelpers.getToken(ctx)).toEqual('Bearer test')
  })
})

describe('Apollo Helper onRedirect', () => {
  it('Should pass', async (done) => {
    await apolloHelpers.onRedirect(null, '/test')

    expect(Router.push).toHaveBeenCalledWith('/test')
    expect(Router.push).toHaveBeenCalledTimes(1)

    return done()
  })

  it('Should pass with ctx', async (done) => {
    const ctx = {
      req: {},
      res: {
        end: jest.fn(),
        writeHead: jest.fn()
      }
    }

    await apolloHelpers.onRedirect(ctx, '/test')

    expect(ctx.res.writeHead).toHaveBeenCalledWith(301, { Location: '/test' })
    expect(ctx.res.writeHead).toHaveBeenCalledTimes(1)
    expect(ctx.res.end).toHaveBeenCalledWith()
    expect(ctx.res.end).toHaveBeenCalledTimes(1)

    return done()
  })
})

describe('Apollo Helper onSignin', () => {
  it('Should pass', async (done) => {
    await apolloHelpers.onSignin(null, 'test')

    expect(nookies.get().sid).toEqual('test')

    nookies.destroy(null, 'sid')
    return done()
  })

  it('Should pass with ctx', async (done) => {
    const ctx = {
      apolloClient: {
        resetStore: jest.fn()
      },
      req: {},
      res: {
        end: jest.fn(),
        writeHead: jest.fn()
      }
    }

    await apolloHelpers.onSignin(ctx, 'test')

    expect(nookies.get().sid).toEqual('test')

    nookies.destroy(null, 'sid')
    return done()
  })
})

describe('Apollo Helper onSignout', () => {
  it('Should pass', async (done) => {
    nookies.set(null, 'sid', 'test')

    await apolloHelpers.onSignout()

    expect(nookies.get().sid).toBeUndefined()

    return done()
  })

  it('Should pass with ctx', async (done) => {
    nookies.set(null, 'sid', 'test')

    const ctx = {
      apolloClient: {
        resetStore: jest.fn()
      },
      req: {},
      res: {
        end: jest.fn(),
        writeHead: jest.fn()
      }
    }

    await apolloHelpers.onSignout(ctx)

    expect(nookies.get(ctx).sid).toBeUndefined()
    expect(ctx.apolloClient.resetStore).toHaveBeenCalledWith()
    expect(ctx.apolloClient.resetStore).toHaveBeenCalledTimes(1)

    return done()
  })
})
