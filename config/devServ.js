var path = require('path')
var api =  require('./api');
module.exports = {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000,
  // index: 'index.js',
  historyApiFallback: true,
  before(app) {
    app.use('/api', api())
  }
}