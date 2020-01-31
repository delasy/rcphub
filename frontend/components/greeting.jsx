import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import '~/styles/components/greeting'

const Greeting = ({ className: inheritClassName, name, ...props }) => {
  const className = classnames(inheritClassName, 'greeting')

  return (
    <div className={className} {...props}>
      <p className='greeting__text'>
        Hello, {name}!
      </p>
    </div>
  )
}

Greeting.defaultProps = {
  className: ''
}

Greeting.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string
}

export default Greeting
