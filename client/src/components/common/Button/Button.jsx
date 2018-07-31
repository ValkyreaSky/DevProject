import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.scss';

class Button extends PureComponent {
  render() {
    const {
      text, block, click, outline, classes, type, disabled, link,
    } = this.props;

    const classNames = classnames(
      classes && classes,
      {
        button: true,
        'button--block': block,
        'button--outline': outline,
        'button--link': link,
      },
    );

    return (
      // eslint-disable-next-line react/button-has-type
      <button
        className={classNames}
        onClick={click}
        type={type}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
}

Button.defaultProps = {
  type: 'button',
  click: null,
  block: false,
  link: false,
  outline: false,
  classes: null,
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  click: PropTypes.func,
  block: PropTypes.bool,
  link: PropTypes.bool,
  outline: PropTypes.bool,
  classes: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
