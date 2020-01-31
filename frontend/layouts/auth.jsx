import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import '~/styles/styles'

import '~/styles/layouts/auth'

const AuthLayout = ({ children, className: inheritClassName, ...props }) => {
  const className = classnames(inheritClassName, 'auth-layout')

  return (
    <div className={className} {...props}>
      <div className='container py-2'>
        <div className='row justify-content-center'>
          <div className='col-6'>
            <main>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

AuthLayout.defaultProps = {
  children: null,
  className: ''
}

AuthLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default AuthLayout
