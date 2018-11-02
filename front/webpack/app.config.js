const path = require(`path`)

module.exports = Object.freeze({
  APP_TITLE: `IPO`, // title in index.html (html-webpack-plugin)
  SRC_DIR: path.resolve(__dirname, `../source`), // directory name for development
  PROD_DIR: path.resolve(__dirname, `../build`) // directory name for production
})