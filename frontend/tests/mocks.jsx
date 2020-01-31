/* eslint-env jest */

jest.mock('next/router', () => {
  return {
    prefetch: jest.fn(),
    push: jest.fn()
  }
})
