import React from 'react'
import { sizeClassNames } from '../util.js'
import cx from 'classnames'

import defaultProps from '../default_props.js'
import defaultPropTypes from '../default_prop_types.js'

export default class Label extends React.Component {
  static displayName = 'FriggingBootstrap.Label'

  static propTypes = {
    labelWidth: defaultPropTypes.labelWidth,
    block: defaultPropTypes.block,
    label: defaultPropTypes.label,
    layout: React.PropTypes.string,
  }

  static defaultProps = {
    block: defaultProps.block,
    label: defaultProps.label,
    layout: 'vertical',
  }

  isEmpty() { return !this.props.label }

  render() {
    const horizontalClasses = sizeClassNames(
      this.props.labelWidth, { offsets: false }
    )

    if (this.props.block) return null
    if (this.props.layout === 'horizontal' && this.isEmpty()) {
      return <div className={horizontalClasses} />
    }

    const labelHtml = Object.assign({}, this.props)
    labelHtml.className = cx(labelHtml.className, {
      [horizontalClasses]: this.props.layout === 'horizontal',
    })

    return (
      <div>
        <label {...labelHtml}>
          {this.props.label}
        </label>
      </div>
    )
  }
}
