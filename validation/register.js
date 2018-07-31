const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRegisterInput(values) {
  const errors = {};
  const data = {};

  data.name = !isEmpty(values.name) ? values.name : '';
  data.email = !isEmpty(values.email) ? values.email : '';
  data.password = !isEmpty(values.password) ? values.password : '';
  data.password2 = !isEmpty(values.password2) ? values.password2 : '';

  // Name
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters!';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required!';
  }

  // Email
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid!';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required!';
  }

  // Password
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters!';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required!';
  }

  // Password confirmation
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'You have to confirm your password!';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match!';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
