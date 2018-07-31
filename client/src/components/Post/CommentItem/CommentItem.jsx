import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/Button/Button';
import { connect } from 'react-redux';
import { asyncRemoveComment } from 'store/actions/post';

const CommentItem = ({
  comment, postId, auth, asyncRemoveComment,
}) => (
  <div className="card card-body mb-3 mt-3">
    <div className="row">
      <div className="col-md-2">
        <br />
        <p className="text-center">{comment.name}</p>
      </div>
      <div className="col-md-10">
        <p className="lead">{comment.text}</p>
        {comment.user === auth.user.id ? (
          <Button
            text="Remove"
            click={() => asyncRemoveComment(postId, comment._id)}
          />
        ) : null}
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  asyncRemoveComment: PropTypes.func.isRequired,
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  asyncRemoveComment,
})(CommentItem);
