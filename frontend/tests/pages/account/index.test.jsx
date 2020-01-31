/* eslint-env jest */

import React from 'react'
import faker from 'faker'
import { render, screen } from '@testing-library/react'

import AccountPage from '~/pages/account'
import nookies from 'nookies'

describe('Page', () => {
  it('Should pass', async (done) => {
    const user = {
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email()
    }

    render(
      <AccountPage user={user} />
    )

    expect(screen.getByText('Sign Out')).toBeInTheDocument()

    nookies.destroy(null, 'sid')
    return done()
  })
})
