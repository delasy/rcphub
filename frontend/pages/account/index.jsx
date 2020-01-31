import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'

import AccountLayout from '~/layouts/account'

import Greeting from '~/components/greeting'
import withUser from '~/hocs/user'

import '~/styles/pages/account'

const Account = ({ user }) => {
  return (
    <AccountLayout className='account-page'>
      <Head>
        <title>Account</title>
      </Head>

      <div>
        <Greeting name={user.firstName} />
        <Link href='/auth/signout'>
          <a>Sign Out</a>
        </Link>
      </div>
    </AccountLayout>
  )
}

Account.propTypes = {
  user: PropTypes.object.isRequired
}

export default withUser(Account)
