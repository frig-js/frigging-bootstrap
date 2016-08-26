/* global describe, it, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import Checkbox from '../../src/js/components/checkbox'
// import InputErrorList from '../../src/js/components/input_error_list'
// import Saved from '../../src/js/components/saved'

import * as common from './_common.test'

const defaultProps = {
  value: true,
  onChange: () => {},
  inputHtml: { type: 'checkbox' },
}

describe('<Checkbox />', () => {
  it('renders', () => {
    mount(<Checkbox {...defaultProps} />)
  })

  describe('common Bootstrap tests', () => {
    common.runInputErrorListTest(Checkbox, defaultProps)
    common.runSavedTest(Checkbox, defaultProps)
    common.runLabelTest(Checkbox, defaultProps)
  })

  it('renders input tag with attrs from props.inputHtml', () => {
    const inputHtml = { autocomplete: 'off' }
    const wrapper = mount(<Checkbox {...defaultProps} inputHtml={inputHtml} />)
    const label = wrapper.find('input')
    expect(label.prop('autocomplete')).to.equal('off')
  })

  // it('renders InputErrorList with props.errors', () => {
  //   const errors = ['should be something', 'should be something else']
  //   const wrapper = mount(<Checkbox {...props} errors={errors} />)
  //   const inputErrorList = wrapper.find(InputErrorList)
  //   expect(inputErrorList.prop('errors')).to.equal(errors)
  // })
  //
  // it('renders Saved with props.saved', () => {
  //   const wrapper = mount(<Checkbox {...props} saved />)
  //   const saved = wrapper.find(Saved)
  //   expect(saved.prop('saved')).to.be.true()
  // })
})
