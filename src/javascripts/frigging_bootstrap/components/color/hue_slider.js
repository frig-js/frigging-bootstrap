let React = require("react")
let Colr = require("colr")
let cx = require("classnames")
let draggable = require('./higher_order_components/draggable')
let {errorList, sizeClassNames, formGroupCx, label} = require("../../util.js")
let {div, input, img} = React.DOM

@draggable
export default class extends React.Component {
  static defaultProps = Object.assign(require("../../default_props.js"))

  static propTypes = {
    value: React.PropTypes.number.isRequired,
  }

  _updatePosition(clientX, clientY) {
    let rect = React.findDOMNode(this).getBoundingClientRect()
    let value = this.getScaledValue((rect.bottom - clientY) / rect.height)
    this.props.onChange(value)
  }

  render() {
    return div({
        className: "slider vertical",
        onMouseDown: this.startUpdates.bind(this),
        onTouchStart: this.startUpdates.bind(this),
      },
        div({
          className: "track",
        }),
        div({
          className: "pointer",
          style: {
            "bottom": this.getPercentageValue(this.props.value),
          },
        })
      )
    }
}