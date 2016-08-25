import React from 'react'
import cx from 'classnames'

import { sizeClassNames } from '../util.js'

export default class Label extends React.Component {
  static displayName = 'FriggingBootstrap.Label'

  static propTypes = {
    labelWidth: React.PropTypes.object.isRequired,
    layout: React.PropTypes.string,
    htmlFor: React.PropTypes.string,
    block: React.PropTypes.bool,
    label: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
      React.PropTypes.bool,    // can set label={false} to not show a label
    ]),
  }

  static defaultProps = {
    block: false,
    label: '',
    htmlFor: '',
    layout: 'vertical',
  }

  isEmpty() { return !this.props.label }

  render() {
    const horizontalClasses = sizeClassNames(
      this.props.labelWidth, { offsets: false }
    )
    const { htmlFor, ...otherProps } = this.props

    if (this.props.block) return null
    if (this.props.layout === 'horizontal' && this.isEmpty()) {
      return <div className={horizontalClasses} />
    }

    const labelHtml = Object.assign({}, otherProps)
    labelHtml.className = cx(labelHtml.className, {
      [horizontalClasses]: this.props.layout === 'horizontal',
    })

    return (
      <div>
        <label htmlFor={htmlFor} {...labelHtml}>
          {this.props.label}
        </label>
      </div>
    )
  }
}
