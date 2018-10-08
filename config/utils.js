const path = require('path');
const fs = require('fs');
const rootDir = fs.realpathSync(process.cwd());
function resolve(url) {
  return path.resolve(rootDir, url)
}

module.exports = {
  resolve
}