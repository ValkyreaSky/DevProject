import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'components/common/Spinner/Spinner';
import PostItem from 'components/Feed/PostItem/PostItem';
import BackButton from 'components/common/BackButton/BackButton';
import CommentItem from 'components/Post/CommentItem/CommentItem';
import CommentForm from 'components/forms/CommentForm/CommentForm';
import { asyncGetPost } from 'store/actions/post';

class Post extends Component {
  componentWillMount() {
    const { match, asyncGetPost } = this.props;
    if (match.params.postId) {
      asyncGetPost(match.params.postId);
    }
  }

  render() {
    let render;
    const { isLoading, post, history } = this.props;

    if (isLoading || Object.keys(post).length === 0) {
      render = <Spinner />;
    } else if (Object.keys(post).length > 0) {
      render = (
        <div>
          <BackButton click={() => history.push('/feed')} />
          <PostItem showActions={false} post={post} />
          {post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))}
          <CommentForm postId={post._id} />
        </div>
      );
    }

    return render;
  }
}

Post.propTypes = {
  asyncGetPost: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.post.loading,
  post: state.post.post,
});

export default connect(mapStateToProps, {
  asyncGetPost,
})(Post);
