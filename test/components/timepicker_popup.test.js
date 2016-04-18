/* global describe, it, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TimePickerPopup from '../../src/js/components/timepicker_popup'

describe('<TimePickerPopup />', () => {
  describe('parseTime()', () => {
    describe('destructures time from TimePicker (6:35PM) into h,m,isAm', () => {
      const time = '6:35 PM'
      const result = TimePickerPopup.parseTime(time)
      const [hour, minutes, isAm] = result

      it('correct hours', () => {
        expect(hour).to.equal(6)
      })
      it('correct minutes', () => {
        expect(minutes).to.equal(35)
      })
      it('correct isAm', () => {
        expect(isAm).to.be.false()
      })
    })
  })

  function testManualEntry(opts) {
    const valueLink = {
      value: opts.input,
      requestChange: () => {},
    }
    const wrapper = shallow(<TimePickerPopup valueLink={valueLink} />)
    const components = wrapper.findWhere(e => e.prop('valueLink') != null)

    const hour = components.at(0).prop('value')
    const minutes = components.at(1).prop('value')
    const isAm = components.at(2).prop('value')

    it(`(${opts.input}) is parsed & populated into h,m,isAm inputs`, () => {
      expect(hour).to.equal(opts.expected.h)
      expect(minutes).to.equal(opts.expected.m)
      expect(isAm).to.equal(opts.expected.isAM)
    })
  }

  describe('manual time entry', () => {
    testManualEntry({ input: '6:35 PM', expected: { h: 6, m: 35, isAM: false } })
    testManualEntry({ input: '13:00 PM', expected: { h: 1, m: 0, isAM: false } })
    testManualEntry({ input: '0:00 AM', expected: { h: 12, m: 0, isAM: true } })
    testManualEntry({ input: '4:-15 PM', expected: { h: 3, m: 45, isAM: false } })
  })

  describe('private functions', () => {
    let instance

    beforeEach(() => {
      instance = shallow(
        <TimePickerPopup valueLink={ {} } />
      ).instance()
    })

    function testMinutesSinceMidnight(input, expected) {
      it(`${input} => ${expected}`, () => {
        const actual = instance._minutesSinceMidnight(input)
        expect(actual).to.equal(expected)
      })
    }

    testMinutesSinceMidnight([5, 15], 315)
    testMinutesSinceMidnight([0, 0], 0)
    testMinutesSinceMidnight([11, 59], (60 * 12 - 1)) // 719

    // testMinutesSinceMidnight([23, 59], )
    // testMinutesSinceMidnight([0, 1], 1)


    // it('5:15 => 315', () => {
    //   const actual = instance._minutesSinceMidnight([5, 15])
    //   const expected = 315
    //   expect(actual).to.equal(expected)
    // })
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
