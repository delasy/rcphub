/* eslint-env jest */

const factory = require('../../factories')

beforeAll(() => {
  return factory.cleanUp()
})

describe('Factory', () => {
  test('Should pass', async (done) => {
    const user = await factory.build('user')

    expect(user).toBeTruthy()

    return done()
  })
})

afterAll(() => {
  return factory.close()
})
