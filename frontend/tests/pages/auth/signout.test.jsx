/* eslint-env jest */

import React from 'react'
import faker from 'faker'
import nookies from 'nookies'
import { render } from '@testing-library/react'

import GET_CURRENT_USER from '~/graphql/queries/get-current-user'
import AuthSignoutPage from '~/pages/auth/signout'
import { mockApolloClient } from '~/tests/fixtures/apollo-provider-mock'

describe('Page', () => {
  it('Should pass', async (done) => {
    nookies.set(null, 'sid', 'test')

    const getCurrentUserMock = {
      request: { query: GET_CURRENT_USER },
      result: {
        data: {
          currentUser: {
            id: faker.random.uuid(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email()
          }
        }
      }
    }

    const apolloClient = mockApolloClient([getCurrentUserMock])
    const props = await AuthSignoutPage.getInitialProps({ apolloClient })

    const { container } = render(
      <AuthSignoutPage {...props} />
    )

    expect(container.innerHTML).toEqual('')

    return done()
  })
})
