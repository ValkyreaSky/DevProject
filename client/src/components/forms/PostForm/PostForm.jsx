import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Aux from 'components/hoc/Aux/Aux';
import FormInput from 'components/forms/FormInput/FormInput';
import BackButton from 'components/common/BackButton/BackButton';
import Button from 'components/common/Button/Button';
import { asyncAddPost } from 'store/actions/post';

const validate = ({ text }) => {
  const errors = {};

  if (!text) {
    errors.text = 'This field is required!';
  }

  if (text && (text.length < 10 || text.length > 300)) {
    errors.text = 'Text must be between 10 and 300 characters!';
  }

  return errors;
};

class PostForm extends Component {
  onFormSubmit = async (values) => {
    const {
      auth, history, asyncAddPost, reset,
    } = this.props;


    const newPost = {
      text: values.text,
      name: auth.user.name,
      avatar: auth.user.avatar,
    };

    await asyncAddPost(newPost, history);
    return reset();
  }

  render() {
    const { handleSubmit, valid, history } = this.props;

    return (
      <Aux>
        <BackButton click={() => history.push('/dashboard')} />
        <form onSubmit={handleSubmit(this.onFormSubmit)} className="mt-4">
          <Field
            name="text"
            component={FormInput}
            inputType="textarea"
            placeholder="Post content"
            label="Post content"
          />
          <Button
            block
            text="Add Post"
            type="submit"
            disabled={!valid}
          />
        </form>
      </Aux>
    );
  }
}

PostForm.propTypes = {
  asyncAddPost: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  valid: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    asyncAddPost,
  }),
  reduxForm({
    form: 'postForm', validate,
  }),
)(PostForm);
