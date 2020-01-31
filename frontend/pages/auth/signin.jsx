import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Head from 'next/head'
import { useMutation } from '@apollo/client'

import AuthLayout from '~/layouts/auth'

import AUTHENTICATE_USER from '~/graphql/mutations/authenticate-user'
import withGuest from '~/hocs/guest'
import { apolloHelpers } from '~/hocs/apollo'

import '~/styles/pages/auth/signin'

const AuthSignin = () => {
  const [authenticateUser] = useMutation(AUTHENTICATE_USER)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await authenticateUser({
        variables: { input: data }
      })

      const { token } = res.data.authenticateUser

      await apolloHelpers.onSignin(null, token)
    } catch (err) {
      setErrors(err.graphQLErrors)
      setLoading(false)
    }
  }

  const handleFormEmailChange = (e) => {
    setErrors([])
    setData({ ...data, email: e.target.value })
  }

  const handleFormPasswordChange = (e) => {
    setErrors([])
    setData({ ...data, password: e.target.value })
  }

  const isValid = () => {
    return !loading && errors.length === 0
  }

  return (
    <AuthLayout className='auth-signin-page'>
      <Head>
        <title>Auth Sign In</title>
      </Head>

      <div>
        <h1>
          Sign In
        </h1>
        {errors.length > 0 && (
          errors.map((error, idx) => {
            return (
              <Alert key={idx} variant='danger'>
                {error.message}
              </Alert>
            )
          })
        )}
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId='email'>
            <Form.Label>
              Email address
            </Form.Label>
            <Form.Control
              disabled={loading}
              onChange={handleFormEmailChange}
              placeholder='Enter email'
              required
              type='email'
              value={data.email}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control
              disabled={loading}
              onChange={handleFormPasswordChange}
              placeholder='Enter password'
              required
              type='password'
              value={data.password}
            />
          </Form.Group>
          <Button disabled={!isValid()} type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </AuthLayout>
  )
}

export default withGuest(AuthSignin)
