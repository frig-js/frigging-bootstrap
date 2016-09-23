/* global describe, it, beforeEach */

import React from 'react'
import td from 'testdouble'

import { expect } from 'chai'
import { mount } from 'enzyme'

import Select from '../../src/js/components/select'
import InputErrorList from '../../src/js/components/input_error_list'
import Saved from '../../src/js/components/saved'
import Label from '../../src/js/components/label'

const defaultProps = {
  value: 'red',
  onChange: () => {},
  inputHtml: {},
  options: [
    { label: 'blue', value: 'blue' },
    { label: 'green`', value: 'green' },
    { label: 'red', value: 'red' },
  ],
}

describe('<Select />', () => {
  it('renders', () => {
    mount(<Select {...defaultProps} />)
  })

  describe('when using default props', () => {
    it('renders Select tag with attrs from props.inputHtml', () => {
      const inputHtml = { disabled: true }
      const wrapper = mount(<Select {...defaultProps} inputHtml={inputHtml} />)
      const select = wrapper.find('select')
      expect(select.prop('disabled')).to.be.true()
    })

    it('renders select tag with props.value as selected value', () => {
      const wrapper = mount(<Select {...defaultProps} />)
      const select = wrapper.find('select').get(0)
      expect(select.value).to.equal('red')
    })

    it('renders InputErrorList with props.errors', () => {
      const errors = ['should be something', 'should be something else']
      const wrapper = mount(<Select {...defaultProps} errors={errors} />)
      const inputErrorList = wrapper.find(InputErrorList)
      expect(inputErrorList.prop('errors')).to.equal(errors)
    })

    it('renders Saved with defaultProps.saved', () => {
      const wrapper = mount(<Select {...defaultProps} saved />)
      const saved = wrapper.find(Saved)
      expect(saved.prop('saved')).to.be.true()
    })

    it('renders Label with defaultProps.label', () => {
      const labelText = 'Pick an option'
      const wrapper = mount(<Select {...defaultProps} label={labelText} />)
      const label = wrapper.find(Label)
      expect(label.prop('label')).to.equal('Pick an option')
    })
  })

  describe('checking the different options types', () => {
    const noop = () => {}

    describe('_getValue', () => {
      const testGetValue = (options, value, onChange, expected) => {
        const props = { options, value, onChange }
        const wrapper = mount(<Select {...props} />)
        const instance = wrapper.instance()
        expect(instance._getValue()).to.equal(expected)
      }

      it('should return the value of the selected option', () => {
        const options = [
          { value: 'CA', label: 'Canada' },
          { value: 'US', label: 'United States' },
        ]
        testGetValue(options, 'US', noop, 'US')
      })

      it('should handle numeric values as Number type', () => {
        const options = [
          { value: 1, label: 'Canada' },
          { value: 2, label: 'United States' },
        ]
        testGetValue(options, 2, noop, 2)
      })

      it('should return \'\' when value is blank', () => {
        const options = [
          { value: '', label: '' },
          { value: 'US', label: 'United States' },
        ]
        testGetValue(options, '', noop, '')
      })
    })

    describe('render', () => {
      it('when props.options is empty, renders select with no options', () => {
        const wrapper = mount(<Select value={''} onChange={noop} />)
        const options = wrapper.find('option')
        expect(options).to.have.lengthOf(0)
      })

      it('when props.options exists, renders select with options', () => {
        const props = {
          options: [
            { value: 'CA', label: 'Canada' },
            { value: 'US', label: 'United States' },
          ],
          value: '',
          onChange: noop,
        }
        const wrapper = mount(<Select {...props} />)
        const options = wrapper.find('option')
        expect(options).to.have.lengthOf(2)
      })

      it('renders an input with onChange that calls Select.props.onChange', () => {
        const onChange = td.function.call()
        const props = {
          options: [
            { value: 'CA', label: 'Canada' },
            { value: 'US', label: 'United States' },
          ],
          value: 'US',
          onChange,
        }
        const wrapper = mount(<Select {...props} />)

        const select = wrapper.find('select')
        const selectOnChange = select.prop('onChange')

        // requestChange gets called on component mount, clear the slate
        td.reset()

        // we want to verify that Select's props.requestChange
        // is the same function passed to <select>'s valuelink. Args don't
        // matter. (They won't be exactly the same since the onChange handler
        // goes through _getValue, rather than respecting the argument passed
        // to requestChange)
        selectOnChange()
        td.verify(onChange(), { ignoreExtraArgs: true })
      })
    })

    describe('componentWillMount / componentDidReceiveProps', () => {
      describe('when value=\'\' (e.g. no selection)', () => {
        it('onChange is called with value of 1st option', () => {
          const onChange = td.function.call()
          const props = {
            options: [
              { value: 'CA', label: 'Canada' },
              { value: 'US', label: 'United States' },
            ],
            value: '',
            onChange,
          }

          // requestChange should be called on component mount
          const wrapper = mount(<Select {...props} />)
          td.verify(onChange('CA', { setModified: false }), { times: 1 })

          // simulate a re-render of the component with the same props
          wrapper.setProps(props)
          td.verify(onChange('CA', { setModified: false }), { times: 2 })
        })

        it('and ANY options value is \'\', requestChange not called', () => {
          const onChange = td.function()
          const props = {
            options: [
              { value: '', label: '-- Select --' },
              { value: 'CA', label: 'Canada' },
              { value: 'US', label: 'United States' },
            ],
            value: '',
            onChange,
          }

          mount(<Select {...props} />)

          td.verify(onChange(), { times: 0, ignoreExtraArgs: true })
        })
      })

      describe('options went from 1 to 0', () => {
        it('calls requestChange(undefined) on re-render', () => {
          const onChange = td.function.call()
          const props = {
            options: [
              { value: 'CA', label: 'Canada' },
            ],
            value: 'CA',
            onChange,
          }

          const wrapper = mount(<Select {...props} />)

          props.options = []
          wrapper.setProps(props)

          td.verify(onChange(undefined), { ignoreExtraArgs: true })
        })
      })
    })
  })
})
