import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './FormTitle.scss';


class FormTitle extends PureComponent {
  render() {
    const { text } = this.props;
    return (
      <p className="text-center mb-4 form-title">{text}</p>
    );
  }
}

FormTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FormTitle;
