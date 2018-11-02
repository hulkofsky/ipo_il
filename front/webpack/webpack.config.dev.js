const webpack = require(`webpack`)
const merge = require(`webpack-merge`)
const {HotModuleReplacementPlugin} = webpack
const webpackConfigCommon = require(`./webpack.config.common`)
const AppConfig = require(`./app.config`)

module.exports = merge(webpackConfigCommon, {

  mode: `development`,

  devtool: `cheap-module-source-map`,

  devServer: {
    compress: false,
    contentBase: AppConfig.PROD_DIR,
    publicPath: `/`,
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 3001
  },

  module: {
    rules: [
      {
        test: /\.styl$/,
        include: AppConfig.SRC_DIR,
        use: [
          {loader: `style-loader`},
          {
            loader: `css-loader`,
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: `postcss-loader`,
            options: {
              sourceMap: true,
              plugins: () => [
                require(`autoprefixer`)(),
                require(`postcss-rtl`)()
              ]
            }
          },
          {
            loader: `stylus-loader`,
            options: {sourceMap: true}
          }
        ]
      }
    ]
  },

  plugins: [
    new HotModuleReplacementPlugin()
  ]

})
