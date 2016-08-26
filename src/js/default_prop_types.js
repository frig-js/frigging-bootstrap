import React from 'react'

const propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool,
  ]),
  onChange: React.PropTypes.func.isRequired,
  inputHtml: React.PropTypes.object,
  className: React.PropTypes.string,
  saved: React.PropTypes.bool,
  errors: React.PropTypes.array,
  block: React.PropTypes.bool,
  labelWidth: React.PropTypes.object.isRequired,
  label: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
    React.PropTypes.bool,    // can set label={false} to not show a label
  ]),
}

Object.freeze(propTypes)

export default propTypes
