const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateExperienceInput(values) {
  const errors = {};
  const data = {};

  data.school = isEmpty(values.school) ? '' : values.school;
  data.from = !isEmpty(values.from) ? values.from : '';
  data.fieldOfStudy = !isEmpty(values.fieldOfStudy) ? values.fieldOfStudy : '';
  data.degree = !isEmpty(values.degree) ? values.degree : '';

  // School
  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required!';
  }

  // Degree
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required!';
  }

  // Field of study
  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of study is required!';
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
