import PropTypes from 'prop-types'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { MockLink as ApolloLinkMock } from '@apollo/client/testing'
import { Children, Component, cloneElement } from 'react'

class ApolloProviderMock extends Component {
  static defaultProps = {
    mocks: []
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    mocks: PropTypes.array
  }

  constructor (props) {
    super(props)

    this.state = {
      apolloClient: mockApolloClient(this.props.mocks)
    }
  }

  componentWillUnmount () {
    this.state.apolloClient.stop()
  }

  render () {
    const { apolloClient } = this.state
    const { children } = this.props

    return !children ? null : (
      cloneElement(Children.only(children), { apolloClient })
    )
  }
}

export const mockApolloClient = (mocks = []) => {
  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: new ApolloLinkMock(mocks, false)
  })
}

export default ApolloProviderMock
