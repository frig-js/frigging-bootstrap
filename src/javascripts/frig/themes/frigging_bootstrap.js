var React                         = require("react/addons")
var {map} = require("../helpers.js")
var {span, i}                     = React.DOM
require("../../../stylesheets/frig/themes/frigging_bootstrap.styl")

var friggingBootstrap
module.exports = friggingBootstrap = {
  /*
   * Optional: a theme-specific list of defaults that override the global
   * Frig.defaults
   */
  defaults: {
    layout:          "vertical",
    // Sizes
    xs:              "12",
    sm:              function () {return this.frigProps.xs || "12"},
    md:              function () {return this.frigProps.sm || "12"},
    lg:              function () {return this.frigProps.md || "12"},
    // Offsets
    xsOffset:        undefined,
    smOffset:        function () {return this.frigProps.xsOffset},
    mdOffset:        function () {return this.frigProps.smOffset},
    lgOffset:        function () {return this.frigProps.mdOffset},
  },

  errorList: function(errors) {
    if (errors) return map(errors, friggingBootstrap.error)
  },

  error: function(msg) {
    return span({className: "help-block"},
      i({className: "fa fa-exclamation-circle"}, ` ${msg}`),
    )
  },

  sizeClassNames: function(props) {
    var classes = {}
    var sizes = ["xs", "sm", "md", "lg"]
    // Adding column classes
    for (var k of sizes) {
      if (props[k] != null) classes[`col-${k}-${props[k]}`] = true
    }
    // Adding offset classes
    for (var size of sizes) {
      k = `${size}Offset`
      if (props[k] == null) continue
      classes[`col-${size}-offset-${props[k]}`] = true
    }
    return classes
  },

}
