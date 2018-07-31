import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Aux from 'components/hoc/Aux/Aux';
import Button from 'components/common/Button/Button';
import { asyncRemovePost, asyncAddLike, asyncRemoveLike } from 'store/actions/post';

class PostItem extends Component {
  onLikeClick = postId => () => {
    const { asyncAddLike } = this.props;
    asyncAddLike(postId);
  }

  onUnlikeClick = postId => () => {
    const { asyncRemoveLike } = this.props;
    asyncRemoveLike(postId);
  }

  render() {
    const {
      post, auth, asyncRemovePost, showActions, history,
    } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-1 d-flex align-items-center">
            <img
              className="rounded-circle d-none d-md-block img-fluid"
              src={post.avatar}
              alt=""
            />
          </div>
          <div className="col">
            <p>{post.name}</p>
            <p>{post.text}</p>
            {showActions
              && (
              <Aux>
                <Button
                  click={this.onLikeClick(post._id)}
                  text={`Like ${post.likes.length}`}
                  outline
                  classes="mr-1"
                />
                <Button
                  click={this.onUnlikeClick(post._id)}
                  text="Unlike"
                  outline
                  classes="mr-1"
                />
                <Button
                  click={() => history.push(`/post/${post._id}`)}
                  text="Comments"
                  outline
                  classes="mr-1"
                />
                {post.user === auth.user.id ? (
                  <Button
                    click={() => asyncRemovePost(post._id)}
                    text="Remove"
                  />
                ) : null}
              </Aux>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  asyncAddLike: PropTypes.func.isRequired,
  asyncRemoveLike: PropTypes.func.isRequired,
  asyncRemovePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default compose(
  withRouter,
  connect(
    mapStateToProps, {
      asyncRemovePost, asyncAddLike, asyncRemoveLike,
    },
  ),
)(PostItem);
