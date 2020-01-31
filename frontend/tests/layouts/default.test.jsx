/* eslint-env jest */

import React from 'react'
import { render, screen } from '@testing-library/react'

import DefaultLayout from '~/layouts/default'

describe('Layout', () => {
  it('Should pass', () => {
    const text = 'Hello, World!'

    render(
      <DefaultLayout>
        {text}
      </DefaultLayout>
    )

    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
