const path = require('path')

module.exports = {
  process(sourceText, sourcePath, options) {
    return {
      code: `module.exports = "jest-file-transform"`
    }
  }
}
