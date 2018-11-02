const webpack = require(`webpack`)
const {DefinePlugin} = webpack
const HTMLPlugin = require(`html-webpack-plugin`)
const AppConfig = require(`./app.config`)
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {

  entry: `${AppConfig.SRC_DIR}/index.js`,
  output: {
    path: `${AppConfig.PROD_DIR}`,
    filename: `scripts/[name].js`,
    publicPath: `/`
  },

  resolve: {
    extensions: [`.js`, `.jsx`, `.json`, `.css`, `.styl`]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: AppConfig.SRC_DIR,
        exclude: /node_modules/,
        loader: `babel-loader`
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        include: AppConfig.SRC_DIR,
        loader: `url-loader`,
        options: {
          limit: 10000,
          name: `images/[name].[hash:7].[ext]`
        }
      },
      {
        test: /\.woff2?$/i,
        include: AppConfig.SRC_DIR,
        loader: `url-loader`,
        options: {
          limit: 10000,
          name: `fonts/[name].[hash:7].[ext]`
        }
      },
      {
        test: /\.(mp4|ogg|webm|mpeg|pdf)$/i,
        include: AppConfig.SRC_DIR,
        loader: `file-loader`,
      }
    ]
  },

  plugins: [
    new HTMLPlugin({
      filename: `index.html`,
      template: `${AppConfig.SRC_DIR}/index.html`,
      title: AppConfig.APP_TITLE,
      minify: {collapseWhitespace: true},
      inject: true,
    }),
    new DefinePlugin({
      DEV: JSON.stringify(`process.env.NODE_ENV === 'dev'`),
    })
  ]

}
