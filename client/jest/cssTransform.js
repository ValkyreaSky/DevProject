// This function transform imported CSS files into empty object.
module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    return 'cssTransform';
  },
};
