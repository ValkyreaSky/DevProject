const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateExperienceInput(values) {
  const errors = {};
  const data = {};

  data.title = isEmpty(values.title) ? '' : values.title;
  data.company = !isEmpty(values.company) ? values.company : '';
  data.from = !isEmpty(values.from) ? values.from : '';

  // Title
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required!';
  }

  // Company
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required!';
  }

  // From
  if (Validator.isEmpty(data.from)) {
    errors.from = 'From field is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
