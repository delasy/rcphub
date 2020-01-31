/* eslint-env jest */

import React from 'react'
import { render, screen } from '@testing-library/react'

import AuthLayout from '~/layouts/auth'

describe('Layout', () => {
  it('Should pass', () => {
    const text = 'Hello, World!'

    render(
      <AuthLayout>
        {text}
      </AuthLayout>
    )

    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
