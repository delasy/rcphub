/* eslint-env jest */

const factory = require('../../factories')

beforeAll(() => {
  return factory.cleanUp()
})

describe('Factory', () => {
  test('Should pass', async (done) => {
    const locale = await factory.build('locale')

    expect(locale).toBeTruthy()

    return done()
  })
})

afterAll(() => {
  return factory.close()
})
