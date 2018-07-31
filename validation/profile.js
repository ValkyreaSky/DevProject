const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateProfileInput(values) {
  const errors = {};
  const data = {};

  data.handle = !isEmpty(values.handle) ? values.handle : '';
  data.status = !isEmpty(values.status) ? values.status : '';
  data.skills = !isEmpty(values.skills) ? values.skills : '';

  // Handle
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle must to be between 2 and 40 characters!';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required!';
  }

  // Status
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required!';
  }

  // Skills
  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required!';
  }

  // Website
  if (values.website) {
    if (!Validator.isURL(values.website)) {
      errors.website = 'Invalid URL!';
    }
  }

  // Twitter
  if (values.twitter) {
    if (!Validator.isURL(values.twitter)) {
      errors.twitter = 'Invalid URL!';
    }
  }

  // YouTube
  if (values.youtube) {
    if (!Validator.isURL(values.youtube)) {
      errors.youtube = 'Invalid URL!';
    }
  }

  // Facebook
  if (values.facebook) {
    if (!Validator.isURL(values.facebook)) {
      errors.facebook = 'Invalid URL!';
    }
  }

  // Instagram
  if (values.instagram) {
    if (!Validator.isURL(values.instagram)) {
      errors.instagram = 'Invalid URL!';
    }
  }

  // LinkedIn
  if (values.linkedin) {
    if (!Validator.isURL(values.linkedin)) {
      errors.linkedin = 'Invalid URL!';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
