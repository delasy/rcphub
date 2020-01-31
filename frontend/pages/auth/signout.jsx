import withUser from '~/hocs/user'
import { apolloHelpers } from '~/hocs/apollo'

const AuthSignout = () => {
  return null
}

AuthSignout.getInitialProps = async (ctx) => {
  await apolloHelpers.onSignout(ctx)
  return {}
}

export default withUser(AuthSignout)
