/* eslint-env jest */

import React from 'react'
import { render, screen } from '@testing-library/react'

import AppPage from '~/pages/_app'
import TestPage from '~/tests/fixtures/test-page'

describe('Page', () => {
  it('Should pass', () => {
    render(
      <AppPage Component={TestPage} pageProps={{}} />
    )

    expect(screen.getByText('Test passed')).toBeInTheDocument()
  })

  it('Should pass with Error', () => {
    const err = new Error('Internal Server Error')

    render(
      <AppPage Component={TestPage} err={err} pageProps={{}} />
    )

    expect(screen.getByText('Test passed')).toBeInTheDocument()
  })
})
