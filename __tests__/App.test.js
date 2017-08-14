import React from 'react'
import renderer from 'react-test-renderer'
import App from '../App'
import {getPrice} from '../prices'

jest.mock('../prices', () => {
  return {
    getPrice: jest.fn(() => ({
      then: () => {
        return {name: 'bitcoin', price_usd: '1.0'}
      },
    })),
  }
})

it('renders without crashing', () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})
