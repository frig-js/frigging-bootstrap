let React = require("react")
let Numeral = require("numeral")
let cx = require("classnames")
let {
  saveList,
  errorList,
  sizeClassNames,
  formGroupCx,
  label,
} = require("../util.js")
let {div, input} = React.DOM

export default class extends React.Component {
  displayName = "Frig.friggingBootstrap.Number"

  static defaultProps = Object.assign(require("../default_props.js"), {
    format: "",
  })

  _formatNumber() {
    let currentNumber = this._toNumeral(this.props.valueLink.value) || ""

    this.props.valueLink.requestChange(
      currentNumber ? currentNumber.format(this.props.format) : ""
    )
  }

  _onBlur() {
    if (this.props.format) this._formatNumber()
  }

  _inputCx() {
    return cx(
      this.props.inputHtml.className,
      "form-control",
    )
  }

  _input() {
    return input(Object.assign({}, this.props.inputHtml, {
        onBlur: this._onBlur.bind(this),
        className: this._inputCx(),
        valueLink: this.props.valueLink,
      })
    )
  }

  _isNumber(value) {
    let number = parseFloat(value)
    return !Number.isNaN(number) && Number.isFinite(number)
  }

  _toNumeral(value) {
    const n = Numeral(value)

    // numeral.js converts empty strings into 0 for no reason, so if given
    // value was not '0' or 0, treat it as null.
    // or
    // numeral.js can sometimes convert values (like '4.5.2') into NaN
    // and we would rather null than NaN.
    if (n.value() === 0 && (value !== 0 && value !== '0') || isNaN(n.value())) {
      return null
    }

    return n
  }

  render() {
    return div({className: cx(sizeClassNames(this.props))},
      div({className: formGroupCx(this.props)},
        div({},
          label(this.props)),
        this._input(),
        saveList(this.props.saved),
        errorList(this.props.errors),
      ),
    )
  }

}
