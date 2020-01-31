/* eslint-env jest */

import React from 'react'
import { render, screen } from '@testing-library/react'

import TestPage from '~/tests/fixtures/test-page'

describe('Higher-Order Component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('Should pass in development environment', async (done) => {
    process.env.NODE_ENV = 'development'

    const { default: withSentry } = await import('~/hocs/sentry')
    const WrappedComponent = withSentry(TestPage)

    render(
      <WrappedComponent />
    )

    expect(screen.getByText('Test passed')).toBeInTheDocument()

    return done()
  })

  it('Should pass in production environment', async (done) => {
    process.env.NODE_ENV = 'production'

    const { default: withSentry } = await import('~/hocs/sentry')
    const WrappedComponent = withSentry(TestPage)

    render(
      <WrappedComponent />
    )

    expect(screen.getByText('Test passed')).toBeInTheDocument()

    return done()
  })

  it('Should pass in test environment', async (done) => {
    process.env.NODE_ENV = 'test'

    const { default: withSentry } = await import('~/hocs/sentry')
    const WrappedComponent = withSentry(TestPage)

    render(
      <WrappedComponent />
    )

    expect(screen.getByText('Test passed')).toBeInTheDocument()

    return done()
  })
})
