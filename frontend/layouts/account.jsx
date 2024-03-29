import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import '~/styles/styles'

import '~/styles/layouts/account'

const AccountLayout = ({
  children,
  className: inheritClassName,
  ...props
}) => {
  const className = classnames(inheritClassName, 'account-layout')

  return (
    <div className={className} {...props}>
      <main>
        {children}
      </main>
    </div>
  )
}

AccountLayout.defaultProps = {
  children: null,
  className: ''
}

AccountLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default AccountLayout
