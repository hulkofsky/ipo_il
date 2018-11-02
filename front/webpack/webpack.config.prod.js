const merge = require(`webpack-merge`)
const ExtractTextPlugin = require(`extract-text-webpack-plugin`)
const ImageMinPlugin = require(`imagemin-webpack-plugin`).default
const ImageMinMozjpeg = require(`imagemin-mozjpeg`)
const webpackConfigCommon = require(`./webpack.config.common`)
const AppConfig = require(`./app.config`)

module.exports = merge(webpackConfigCommon, {

  mode: `production`,

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: `vendor-libs`,
          chunks: `all`
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.styl$/,
        include: AppConfig.SRC_DIR,
        use: ExtractTextPlugin.extract({
          fallback: `style-loader`,
          publicPath: `../`,
          use: [
            {
              loader: `css-loader`,
              options: {
                importLoaders: 2
              }
            },
            {
              loader: `postcss-loader`,
              options: {
                plugins: () => [
                  require(`autoprefixer`)(),
                  require(`postcss-rtl`)(),
                  require(`postcss-csso`)()
                ]
              }
            },
            {loader: `stylus-loader`}
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({filename: `stylesheet/style.css`}),
    // new ImageMinPlugin({
    //   test: /\.(png|jpe?g|svg)$/i,
    //   optipng: {
    //     optimizationLevel: 7
    //   },
    //   pngquant: {
    //     quality: `65-90`,
    //     speed: 4
    //   },
    //   gifsicle: {
    //     optimizationLevel: 3
    //   },
    //   svgo: {
    //     plugins: [{
    //       removeViewBox: false,
    //       removeEmptyAttrs: true
    //     }]
    //   },
    //   jpegtran: {
    //     progressive: true
    //   },
    //   plugins: [
    //     ImageMinMozjpeg({
    //       quality: 65,
    //       progressive: true
    //     })
    //   ]
    // })
  ]

})
