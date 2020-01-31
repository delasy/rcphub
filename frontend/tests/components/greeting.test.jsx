/* eslint-env jest */

import React from 'react'
import { render, screen } from '@testing-library/react'

import Greeting from '~/components/greeting'

describe('Component', () => {
  it('Should pass', () => {
    render(
      <Greeting name='World' />
    )

    expect(screen.getByText(/^Hello, /)).toHaveTextContent('Hello, World!')
  })
})
