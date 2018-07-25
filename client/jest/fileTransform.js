const path = require('path');

// This function transform imported files files into its names.
module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
