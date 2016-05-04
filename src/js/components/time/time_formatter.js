export default class TimeFormatter {
  static regex = /^(\d{1,2}):(\d{2}) ?([APap][Mm])?$/

  constructor(timeString) {
    this.timeString = timeString
    this.matches = this.timeString.match(TimeFormatter.regex)

    if (this.matches == null) {
      throw new Error(`invalid time ${timeString} supplied to TimeFormatter`)
    }

    if (this._hours() > 24) throw new RangeError('hour must not be >24')
    if (this._minutes() > 59) throw new RangeError('minute must not be >59')
  }

  get hours() {
    return (this._hours() % 12).toString()
  }

  get minutes() {
    return this._minutes()
  }

  get amPm() {
    if (parseInt(this._hours(), 10) > 12) return 'PM'
    if (this._amPm() == null) return 'AM'
    return this._amPm().toUpperCase()
  }

  toString() {
    return this.timeString
  }

  _hours() {
    return this.matches[1]
  }

  _minutes() {
    return this.matches[2]
  }

  _amPm() {
    return this.matches[3]
  }
}
