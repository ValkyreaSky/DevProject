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
import { asyncRegisterUser } from 'store/actions/auth';

const validate = ({
  name, email, password, password2,
}) => {
  const errors = {};
  const emailRe = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i;

  if (!name) {
    errors.name = 'This field is required!';
  }

  if (name && (name.length < 2 || name.length > 30)) {
    errors.name = 'Name must be between 2 and 30 characters!';
  }

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

  if (!password2) {
    errors.password2 = 'This field is required!';
  }

  if (password && password2 && (password !== password2)) {
    errors.password2 = 'Passwords must be the same!';
  }

  return errors;
};

class RegisterForm extends Component {
  componentDidMount() {
    const { isAuthenticated, history } = this.props;

    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }

  onFormSubmit = (values) => {
    const { asyncRegisterUser, history } = this.props;

    return asyncRegisterUser(values, history);
  }

  render() {
    const {
      handleSubmit, handleDisplayBase, handleDisplayChange, valid,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onFormSubmit)}>
        <BackButton click={handleDisplayBase} />
        <FormTitle text="Register" />
        <Field
          name="name"
          component={FormInput}
          inputType="textinput"
          type="text"
          placeholder="Name"
          label="Name"
        />
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
        <Field
          name="password2"
          component={FormInput}
          inputType="textinput"
          type="password"
          placeholder="Confirm Password"
          label="Confirm password"
        />
        <Button
          block
          type="submit"
          text="Register"
          disabled={!valid}
        />
        <p className="text-center mt-4 mb-0">Have an account?</p>
        <Button
          block
          link
          text="Login"
          click={handleDisplayChange('login')}
        />
      </form>
    );
  }
}

RegisterForm.propTypes = {
  asyncRegisterUser: PropTypes.func.isRequired,
  handleDisplayBase: PropTypes.func.isRequired,
  handleDisplayChange: PropTypes.func.isRequired,
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
    asyncRegisterUser,
  }),
  reduxForm({
    form: 'registerForm', validate,
  }),
)(RegisterForm);
