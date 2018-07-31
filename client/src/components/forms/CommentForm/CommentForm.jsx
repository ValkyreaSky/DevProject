import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import FormInput from 'components/forms/FormInput/FormInput';
import Button from 'components/common/Button/Button';
import { asyncAddComment } from 'store/actions/post';

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

class CommentForm extends Component {
  onFormSubmit = async (values) => {
    const {
      postId, asyncAddComment, history, auth, reset,
    } = this.props;

    const newComment = {
      text: values.text,
      name: auth.user.name,
      avatar: auth.user.avatar,
    };

    await asyncAddComment(postId, newComment, history);
    return reset();
  }

  render() {
    const { handleSubmit, valid } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onFormSubmit)} className="mt-4">
        <Field
          name="text"
          component={FormInput}
          inputType="textarea"
          placeholder="Comment content"
          label="Comment content"
        />
        <Button
          block
          text="Add comment"
          type="submit"
          disabled={!valid}
        />
      </form>
    );
  }
}

CommentForm.propTypes = {
  asyncAddComment: PropTypes.func.isRequired,
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
    asyncAddComment,
  }),
  reduxForm({
    form: 'commentForm', validate,
  }),
)(CommentForm);
