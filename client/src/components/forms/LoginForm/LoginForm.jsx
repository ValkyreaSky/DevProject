import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import FormTitle from 'components/forms/FormTitle/FormTitle';
import FormInput from 'components/forms/FormInput/FormInput';
import BackButton from 'components/common/BackButton/BackButton';
import Button from 'components/common/Button/Button';
import { asyncLoginUser } from 'store/actions/auth';

const validate = ({ email, password }) => {
  const errors = {};
  const emailRe = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i;

  if (!email) {
    errors.email = 'This field is required!';
  }

  if (email && !email.match(emailRe)) {
    errors.email = 'The email format is invalid!';
  }

  if (!password) {
    errors.password = 'This field is required!';
  }

  if (password && (password.length < 6 || password.length > 30)) {
    errors.password = 'Password must be between 6 and 30 characters!';
  }

  return errors;
};

class LoginForm extends Component {
  componentDidMount() {
    const { history, isAuthenticated } = this.props;

    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }

  onFormSubmit = (values) => {
    const { history, asyncLoginUser } = this.props;

    return asyncLoginUser(values, history);
  }

  render() {
    const {
      handleSubmit, handleDisplayBase, valid, handleDisplayChange,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onFormSubmit)}>
        <BackButton click={handleDisplayBase} />
        <FormTitle text="Login" />
        <Field
          name="email"
          component={FormInput}
          inputType="textinput"
          type="email"
          placeholder="Email Address"
          label="Email Address"
        />
        <Field
          name="password"
          component={FormInput}
          inputType="textinput"
          type="password"
          placeholder="Password"
          label="Password"
        />
        <Button
          block
          text="Login"
          type="submit"
          disabled={!valid}
        />
        <p className="text-center mt-4 mb-0">Dont have an account?</p>
        <Button
          block
          link
          text="Register"
          click={handleDisplayChange('register')}
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  asyncLoginUser: PropTypes.func.isRequired,
  handleDisplayChange: PropTypes.func.isRequired,
  handleDisplayBase: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  valid: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    asyncLoginUser,
  }),
  reduxForm({
    form: 'loginForm', validate,
  }),
)(LoginForm);
