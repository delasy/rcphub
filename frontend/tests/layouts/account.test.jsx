/* eslint-env jest */

import React from 'react'
import { render, screen } from '@testing-library/react'

import AccountLayout from '~/layouts/account'

describe('Layout', () => {
  it('Should pass', () => {
    const text = 'Hello, World!'

    render(
      <AccountLayout>
        {text}
      </AccountLayout>
    )

    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
