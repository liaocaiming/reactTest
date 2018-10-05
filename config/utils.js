const path = require('path');
function resolve(url) {
  return path.join(__dirname, url)
}

module.exports = {
  resolve
}