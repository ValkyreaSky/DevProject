import React from 'react';
import PropTypes from 'prop-types';
import './FormInput.scss';

const FormInput = ({
  inputType, type, label, placeholder, disabled, input, multiple, options, meta: { touched, error, active },
}) => {
  let render;

  if (inputType === 'select') {
    render = (
      <select
        {...input}
        multiple={multiple}
        value={input.value || ''}
        className={`form-contro ${touched && !!error ? 'is-invalid' : ''} ${input.value !== '' ? '' : 'notDirty'}`}
        id={`input${input.name}`}
      >
        {options.map(option => (
          <option key={option.key} value={option.value}>{option.text}</option>
        ))}
      </select>
    );
  }
  if (inputType === 'textarea') {
    render = (
      <textarea
        {...input}
        placeholder={placeholder}
        className={`form-contro ${touched && error && 'is-invalid'}`}
        id={`input${input.name}`}
      />
    );
  }
  if (inputType === 'textinput') {
    render = (
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className={`form-contro ${touched && error && 'is-invalid'}`}
        id={`input${input.name}`}
        disabled={disabled}
      />
    );
  }

  return (
    <div className="form-box">
      {type === 'date' && (
      <label
        htmlFor={`input${input.name}`}
        className="my-label label-show"
      >
        {label}
      </label>
      )}
      <label
        htmlFor={`input${input.name}`}
        className={`my-label ${input.value.length > 0 ? 'label-show' : 'label-hide'}`}
      >
        {label}
      </label>
      {render}
      {touched && !!error && (
        <div className="invalid-info">
          {error}
        </div>
      )}
    </div>
  );
};

FormInput.defaultProps = {
  multiple: false,
  disabled: false,
  options: [],
  type: '',
  placeholder: '',
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  inputType: PropTypes.string.isRequired,
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  meta: PropTypes.objectOf(PropTypes.any).isRequired,
  options: PropTypes.arrayOf(PropTypes.any),
  multiple: PropTypes.bool,
  type: PropTypes.string,
};

export default FormInput;
