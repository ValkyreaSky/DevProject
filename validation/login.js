const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateLoginInput(values) {
  const errors = {};
  const data = {};

  data.email = !isEmpty(values.email) ? values.email : '';
  data.password = !isEmpty(values.password) ? values.password : '';

  // Email
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid!';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required!';
  }

  // Password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
