const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const isProduction = process.env.FRIG_ENV === 'production'
const minify = process.env.FRIG_MIN === 'minify'
const minExt = minify ? '.min' : ''

if (!isProduction) {
  const message = '\nPlease use npm link and the Frig examples for debugging ' +
    'Frigging Bootstrap.' +
    '\n\nSee the Frig\'s HACKING.md for further details.\n'
  console.log(message) // eslint-disable-line no-console
  process.exit()
}

const plugins = [new ExtractTextPlugin(`frigging-bootstrap${minExt}.css`)]

if (minify) {
  plugins.unshift(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
  }))
}

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: 'dist',
    filename: `frigging-bootstrap${minExt}.js`,
    libraryTarget: 'umd',
    library: 'FriggingBootstrap',
  },
  externals: {
    react: true,
    'react-dom': true,
    frig: true,
    'react-addons-css-transition-group': true,
    colr: true,
    numeral: true,
    classnames: true,
  },
  resolve: {
    root: [path.join(__dirname, 'src', 'javascripts'), path.join(__dirname, 'src', 'stylesheets')],
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
      }, {
        test: /\.jsx?$/,
        exclude: /^(node_modules|dist|scripts)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-1'],
          plugins: ['babel-plugin-transform-decorators-legacy'],
        },
      }, {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader',
      },
    ],
  },
  plugins,
}
