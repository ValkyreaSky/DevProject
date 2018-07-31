import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import logo from 'assets/logo-color.svg';
import { logoutUser } from 'store/actions/auth';

/* eslint-disable react/prefer-stateless-function */
class Navigation extends Component {
  render() {
    const {
      isAuthenticated, user, handle, isProfile, history, logoutUser,
    } = this.props;

    const menu = isAuthenticated ? (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/developers" className="nav-link">Developers</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/feed" className="nav-link">Feed</NavLink>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src={user.avatar} width={18} alt="" className="rounded-circle mr-2" />
            {user.name}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            {handle && <Link className="dropdown-item" to={`/profile/${handle}`}>My Profile</Link>}
            {isProfile && <Link className="dropdown-item" to="/edit-profile">Edit Profile</Link>}
            {isProfile && <Link className="dropdown-item" to="/add-experience">Add Experience</Link>}
            {isProfile && <Link className="dropdown-item" to="/add-education">Add Education</Link>}
            {isProfile && <div className="dropdown-divider" />}
            <button type="button" onClick={logoutUser(history)} className="dropdown-item c-pointer" href="#">Logout</button>
          </div>
        </li>
      </ul>
    ) : (
      null
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <svg
              viewBox={logo.viewBox}
              style={{
                width: '30px', height: '30px',
              }}
              className="d-inline-block align-top mr-2"
            >
              <use xlinkHref={logo} />
            </svg>
            devplace
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {menu}
          </div>
        </div>
      </nav>
    );
  }
}

Navigation.defaultProps = {
  isProfile: false,
  handle: null,
};

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isProfile: PropTypes.bool,
  handle: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  handle: (state.profile.profile && state.profile.profile.handle)
    ? state.profile.profile.handle
    : null,
  isProfile: (state.profile.profile && Object.keys(state.profile.profile).length > 0),
  user: state.auth.user,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    logoutUser,
  }),
)(Navigation);
