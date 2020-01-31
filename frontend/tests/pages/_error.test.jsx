/* eslint-env jest */

import React from 'react'
import { render, screen } from '@testing-library/react'

import ErrorPage from '~/pages/_error'

describe('Page', () => {
  it('Should pass', () => {
    render(
      <ErrorPage statusCode={404} />
    )

    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('Should pass with error with props', async (done) => {
    const props = await ErrorPage.getInitialProps({})

    render(
      <ErrorPage {...props} />
    )

    expect(screen.getByText('404')).toBeInTheDocument()

    return done()
  })

  it('Should pass with error', () => {
    const err = new Error('This page could not be found')

    render(
      <ErrorPage err={err} statusCode={404} />
    )

    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('Should pass with error with props', async (done) => {
    const err = new Error()

    err.statusCode = 404

    const props = await ErrorPage.getInitialProps({ err })

    render(
      <ErrorPage {...props} />
    )

    expect(screen.getByText('404')).toBeInTheDocument()

    return done()
  })

  it('Should pass with res with props', async () => {
    const res = {
      statusCode: 404
    }

    const props = await ErrorPage.getInitialProps({ res })

    render(
      <ErrorPage {...props} />
    )

    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
