const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

const baseSCSS = new ExtractTextPlugin('main/_selectise-base.css')
const themeSCSS = new ExtractTextPlugin('main/_selectise-theme.css')

module.exports = {
  entry: {
    example: [
      path.join(__dirname, 'src', 'example', 'index.js')
    ],
    main: [
      'idempotent-babel-polyfill',
      path.join(__dirname, 'src', 'index.js')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: path.join('[name]', 'index.js'),
    library: 'Selectise',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          }
        )
      },
      {
        test: /\_selectise-base-scss$/,
        use: baseSCSS.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          }
        )
      },
      {
        test: /\_selectise-theme-scss$/,
        use: themeSCSS.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          }
        )
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin('dist', {}),
    new ExtractTextPlugin({ filename: path.join('example', 'style.css') }),
    baseSCSS,
    themeSCSS,
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: path.join(__dirname, 'src', 'example', 'index.html'),
      filename: path.join('example', 'index.html')
    })
  ]
}