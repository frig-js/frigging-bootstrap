import React from 'react'
import cx from 'classnames'

import { ValueLinkedSelect } from 'frig'

import InputErrorList from './input_error_list'
import Saved from './saved'
import Label from './label'
import { sizeClassNames, formGroupCx } from '../util.js'

export default class Select extends React.Component {
  static displayName = 'FriggingBootstrap.Select'

  static defaultProps = Object.assign({}, require('../default_props.js'), {
    options: {},
  })

  static propTypes = {
    inputHtml: React.PropTypes.object,
    options: React.PropTypes.object,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool,
      ]),
      requestChange: React.PropTypes.func,
    }).isRequired,

    saved: React.PropTypes.bool,
    errors: React.PropTypes.array,
  }

  _inputHtml() {
    return Object.assign({}, this.props.inputHtml, {
      key: 'input',
      className: 'form-control',
      valueLink: this.props.valueLink,
      options: this.props.options,
    })
  }

  render() {
    const labelProps = Object.assign({}, this.props, { className: '' })
    return (
      <div className={cx(sizeClassNames(this.props))}>
        <div className={formGroupCx(this.props)}>
          <Label {...labelProps} />
          <div className="controls">
            <ValueLinkedSelect {...this._inputHtml()} />
            <InputErrorList errors={this.props.errors} />
          </div>
          <Saved saved={this.props.saved} />
        </div>
      </div>
    )
  }

}
