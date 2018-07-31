import React, { Component } from 'react';
import PropTypes from 'prop-types';
import arrowIcon from 'assets/arrow-back.svg';
import './BackButton.scss';

class BackButton extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { click } = this.props;

    return (
      <svg viewBox={arrowIcon.viewBox} onClick={click} className="back-button">
        <use xlinkHref={arrowIcon} />
      </svg>
    );
  }
}

BackButton.propTypes = {
  click: PropTypes.func.isRequired,
};

export default BackButton;
