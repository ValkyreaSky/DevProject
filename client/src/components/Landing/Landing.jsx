import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Aux from 'components/hoc/Aux/Aux';
import LoginForm from 'components/forms/LoginForm/LoginForm';
import RegisterForm from 'components/forms/RegisterForm/RegisterForm';
import Button from 'components/common/Button/Button';
import logo from 'assets/logo-color.svg';
import './Landing.scss';

class Landing extends Component {
  state = {
    // Available displays are 'base', 'login' and 'register'.
    display: 'base',
  }

  componentWillMount() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) history.push('/dashboard');
  }

  handleDisplayChange = item => () => {
    this.setState({
      display: item,
    });
    window.scrollTo(0, 0);
  }

  handleDisplayBase = () => {
    this.setState({
      display: 'base',
    });
  }

  render() {
    let render;
    const { display } = this.state;

    if (display === 'base') {
      render = (
        <Aux>
          <svg viewBox={logo.viewBox} className="landing__logo">
            <use xlinkHref={logo} />
          </svg>
          <h1 className="landing__heading">Social network for developers.</h1>
          <h2 className="landing__subheading">Join Devplace now!</h2>
          <Button
            block
            text="Login"
            classes="mb-1"
            click={this.handleDisplayChange('login')}
          />
          <Button
            block
            outline
            text="Register"
            click={this.handleDisplayChange('register')}
          />
        </Aux>
      );
    } else if (display === 'login') {
      render = (
        <LoginForm
          handleDisplayBase={this.handleDisplayBase}
          handleDisplayChange={this.handleDisplayChange}
        />
      );
    } else if (display === 'register') {
      render = (
        <RegisterForm
          handleDisplayBase={this.handleDisplayBase}
          handleDisplayChange={this.handleDisplayChange}
        />
      );
    }

    return (
      <div className="landing">
        <div className="landing__box">
          {render}
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatetoProps)(Landing);
