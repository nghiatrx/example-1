import React from 'react'
import { TextField } from '../../components/Inputs'
import renderer from 'react-test-renderer'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}))

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Button', () => {
  it('should match to snapshot', () => {
    const component = renderer.create(<TextField input={{ value: 'test' }} meta={{ error: null, warning: null }} />).toJSON()
    expect(component).toMatchSnapshot()
  })
})