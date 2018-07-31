const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePostInput(values) {
  const errors = {};
  const data = {};

  data.text = !isEmpty(values.text) ? values.text : '';

  // Text
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Text must be between 10 and 300 characters!';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
