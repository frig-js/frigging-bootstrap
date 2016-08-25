/* global describe, it, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import Form from '../../src/js/components/form'

describe('<Form />', () => {
  const Stub = () => <div />

  describe('when no prop is entered', () => {
    it('renders only prop <Form>', () => {
      const wrapper = mount(<Form><div /></Form>)
      expect(wrapper.find('form').at(0).text()).to.equal('')
    })
  })

  describe('on props.layout="horizontal"', () => {
    it('renders prop className=form-horizontal', () => {
      const wrapper = mount(<Form layout="horizontal"><div /></Form>)
      const form = wrapper.find('form').at(0)
      expect(form.prop('className')).to.equal('form-horizontal')
    })
  })

  describe('on props.className', () => {
    it('renders prop className=some_class', () => {
      const wrapper = mount(<Form formHtml={{ className: 'some_class' }}><div /></Form>)
      const form = wrapper.find('form').at(0)
      expect(form.prop('className')).to.contain('some_class')
    })
  })

  describe('on prop.children', () => {
    it('renders the children', () => {
      const jsx = (
        <Form>
          <Stub />
        </Form>
      )
      const wrapper = mount(jsx)
      const form = wrapper.find('form').at(0)
      expect(form.find(Stub)).to.have.length(1)
    })
  })
})
