const { Router } = require('express')

const routeAll = (req, res) => {
  res.status(404).end('404 Not Found')
}

module.exports = Router()
  .all('*', routeAll)
