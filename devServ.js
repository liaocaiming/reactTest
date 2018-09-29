var path = require('path')
module.exports = {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000,
  // index: 'index.js',
  historyApiFallback: true,
  before(app) {
    // app.use()
  }
}