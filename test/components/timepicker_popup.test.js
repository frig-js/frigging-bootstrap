/* global describe, it, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TimePickerPopup from '../../src/js/components/timepicker_popup'


describe('<TimePickerPopup />', () => {
  describe('parseTime()', () => {
    describe('destructures time from TimePicker (6:35PM) into h,m,isAm', () => {
      const [hour, minutes, isAm] = TimePickerPopup.parseTime('6:35 PM')
      expect(hour).to.equal(6)
      expect(minutes).to.equal(35)
      expect(isAm).to.be.false()
    })
  })

  describe('manual time entry', () => {
    const testManualEntry = (opts) => {
      const valueLink = {
        value: opts.input,
        requestChange: () => {},
      }
      const wrapper = shallow(<TimePickerPopup valueLink={valueLink} />)

      // We are trying to find the <Input> components, but with shallow
      // rendering all we get is a <HigherOrderComponent>. We don't want
      // to search for that specifically. Instead can just look for "any"
      // component that has a `valueLink` prop.
      const hasValueLinkProp = e => e.prop('valueLink') != null
      const components = wrapper.findWhere(hasValueLinkProp)

      const hour = components.at(0).prop('value')
      const minutes = components.at(1).prop('value')
      const isAm = components.at(2).prop('value')

      it(`(${opts.input}) is parsed & populated into h,m,isAm inputs`, () => {
        expect(hour).to.equal(opts.expected.h)
        expect(minutes).to.equal(opts.expected.m)
        expect(isAm).to.equal(opts.expected.isAM)
      })
    }

    testManualEntry({ input: '6:35 PM', expected: { h: 6, m: 35, isAM: false } })
    testManualEntry({ input: '13:00 PM', expected: { h: 1, m: 0, isAM: false } })
    testManualEntry({ input: '0:00 AM', expected: { h: 12, m: 0, isAM: true } })
    testManualEntry({ input: '4:-15 PM', expected: { h: 3, m: 45, isAM: false } })
  })

  describe('private functions', () => {
    let instance

    beforeEach(() => {
      // TODO: Figure out a way to grab instance methods from a React component
      // without the warnings. The <TimePickerPopup> renders <UnboundInputs>,
      // which in turn require a theme. Since we're not providing one, the
      // unbound inputs get rendered as "<undefined>" tags, and React warns.
      instance = shallow(
        <TimePickerPopup valueLink={ {} } />
      ).instance()
    })

    const testMinutesSinceMidnight = (input, expected) => {
      it(`${input} => ${expected}`, () => {
        const actual = instance._minutesSinceMidnight(input)
        expect(actual).to.equal(expected)
      })
    }

    testMinutesSinceMidnight([5, 15], 315)
    testMinutesSinceMidnight([0, 0], 0)
    testMinutesSinceMidnight([11, 59], (60 * 12 - 1)) // 719
  })

  describe('when hours is set to 13', () => {
    it('should reset to 1')
    it('should toggle AM/PM')
  })
  describe('when hours is set to 0', () => {
    it('should reset to 12')
    it('should toggle AM/PM')
  })

  describe('notifies TimePicker', () => {
    it('when hours is changed from popup', () => {})
    it('when minutes is changed from popup')
    it('when meridiem is changed from popup')
  })

  it('when minutes is set to 60, reset to 0 and increment hour')
  it('when minutes is set to -1, reset to 45 and decrement hour')

  it('cannot blank the field')
  it('cannot set hours out of range')
  it('cannot set minutes out of range')

  it('quirk: 12:00 decrement minutes => 11:15')
  it('quirk: 12:00 decrement hour => 12:00')
})
