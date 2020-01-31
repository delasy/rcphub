import * as Sentry from '@sentry/node'

import project from '~/package'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV === 'production'
    ? 'Production'
    : process.env.NODE_ENV === 'test' ? 'Staging' : 'Development',
  release: project.name + '@' + project.version
})

export default (PageComponent) => {
  return PageComponent
}
