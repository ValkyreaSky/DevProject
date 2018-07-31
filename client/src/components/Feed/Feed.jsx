import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from 'components/forms/PostForm/PostForm';
import Spinner from 'components/common/Spinner/Spinner';
import { asyncGetPosts } from 'store/actions/post';
import PostItem from './PostItem/PostItem';

class Feed extends Component {
  componentWillMount() {
    const { asyncGetPosts } = this.props;

    asyncGetPosts();
  }

  render() {
    let render;
    const { loading, posts } = this.props;

    if (loading) {
      render = <Spinner />;
    } else {
      render = (
        <div className="feed">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              <hr />
              {posts.map(post => <PostItem showActions key={post._id} post={post} />)}
            </div>
          </div>
        </div>
      );
    }
    return render;
  }
}

Feed.propTypes = {
  asyncGetPosts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  loading: state.post.loading,
  posts: state.post.posts,
});

export default connect(mapStateToProps, {
  asyncGetPosts,
})(Feed);
