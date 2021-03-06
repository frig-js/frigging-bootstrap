import React from 'react'
import cx from 'classnames'

import InputErrorList from './input_error_list'
import Saved from './saved'
import Label from './label'
import {
  sizeClassNames,
  formGroupCx,
  inputContainerCx,
} from '../util.js'
import defaultProps from '../default_props.js'
import defaultPropTypes from '../default_prop_types.js'

export default class Input extends React.Component {
  static displayName = 'FriggingBootstrap.Input'

  static propTypes = Object.assign({},
    defaultPropTypes, {
      prefix: React.PropTypes.string,
      suffix: React.PropTypes.string,
    }
  )

  static defaultProps = Object.assign({}, defaultProps, {
    // Bootstrap input addon texts
    prefix: undefined,
    suffix: undefined,
  })

  _inputHtml() {
    return Object.assign({}, this.props.inputHtml, {
      className: cx(this.props.className, 'form-control'),
      value: this.props.value,
      onChange: this.props.onChange,
    })
  }

  _inputPrefix() {
    if (this.props.prefix == null) return ''
    return <div className="input-group-addon">{this.props.prefix}</div>
  }

  _input() {
    const props = this._inputHtml()
    return <input {...props} />
  }

  _inputSuffix() {
    if (this.props.suffix == null) return ''
    return <div className="input-group-addon">{this.props.suffix}</div>
  }

  _inputGroup() {
    const labelProps = {
      label: this.props.label,
      labelWidth: this.props.labelWidth,
      layout: this.props.layout,
    }
    let inputLabel = <Label {...labelProps} />
    let saved = <Saved saved={this.props.saved} />

    if (this.props.prefix || this.props.suffix) {
      return (
        <div>
          {inputLabel}
          <div className="input-group">
            {this._inputPrefix()}
            {this._input()}
            {saved}
            {this._inputSuffix()}
          </div>
        </div>
      )
    }

    return (
      <div>
        {inputLabel}
        {this._input()}
        {saved}
      </div>
    )
  }

  render() {
    return (
      <div className={cx(sizeClassNames(this.props))}>
        <div className={formGroupCx(this.props)}>
          <div className={inputContainerCx(this.props)}>
            {this._inputGroup()}
            <InputErrorList errors={this.props.errors} />
          </div>
        </div>
      </div>
    )
  }

}
