// Packages
const express = require('express');
const passport = require('passport');
// Models
const Post = require('../models/Post');
const Profile = require('../models/Profile');
// Input validation
const validatePostInput = require('../../validation/post');

const router = express.Router();

/**
 * @route   GET api/posts
 * @desc    Get all posts
 * @access  Public
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // In 'posts' collection, find all posts
  Post.find()
    // Sort by date decreasing
    .sort({ date: -1 })
    // Response with posts list
    .then(posts => res.json(posts))
    // Response 404 with error if 0 posts found
    .catch(() => res.status(404).json({ posts: 'There are no posts' }));
});

/**
 * @route   GET api/posts/:id
 * @desc    Get post by its ID
 * @access  Public
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // In 'posts' collection, find post with ID passed in parameters
  Post.findById(req.params.id)
    // Response with post
    .then(post => res.json(post))
    // Response 404 with error if post not found
    .catch(() => res.status(404).json({ posts: 'Post not found' }));
});

/**
 * @route   POST api/posts
 * @desc    Create post
 * @access  Private
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Response 400 with errors if input values are not valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Create new post data
  const newPost = new Post({
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id,
  });

  // Save new post
  newPost.save().then(post => res.json(post));
  return null;
});

/**
 * @route   DELETE api/posts/:id
 * @desc    Delete post by its ID
 * @access  Private
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // In 'profiles' collection, find profile with ID same as current user ID
  Profile.findOne({ user: req.user.id })
    .then(() => {
      // In 'posts' collection, find post posts with ID passed in parameters
      Post.findById(req.params.id)
        .then((post) => {
          // If post creator ID is not equal to current user ID response 401 with error
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notAuthorized: 'User not authorized' });
          }

          // Remove post.
          return post.remove().then(() => res.json({ success: true }));
        })
        // If post with passed ID not exists response 404 with error
        .catch(() => res.status(404).json({ postnotfound: 'Post not found!' }));
    });
});

/**
 * @route   POST api/posts/like/:id
 * @desc    Like post by its ID
 * @access  Private
 */
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // In 'profiles' collection, find profile with ID same as current user ID
  Profile.findOne({ user: req.user.id })
    .then(() => {
      // In 'posts' collection, find post posts with ID passed in parameters
      Post.findById(req.params.id)
        .then((post) => {
          // Check if current user allready liked post
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            // If user already liked post, response 400 with error
            return res.status(400).json({ allreadyliked: 'User already liked this post' });
          }

          // Add user ID to likes array
          post.likes.unshift({ user: req.user.id });

          // Save post with updated likes array
          return post.save().then(newPost => res.json(newPost));
        })
        // If post with passed ID not exists response 404 with error
        .catch(() => res.status(404).json({ postnotfound: 'Post not found!' }));
    });
});

/**
 * @route   POST api/posts/unlike/:id
 * @desc    Unlike post by its ID
 * @access  Private
 */
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // In 'profiles' collection, find profile with ID same as current user ID
  Profile.findOne({ user: req.user.id })
    .then(() => {
      // In 'posts' collection, find post posts with ID passed in parameters
      Post.findById(req.params.id)
        .then((post) => {
          // Check if current user liked post
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            // If user not liked post, response 400 with error
            return res.status(400).json({ notliked: 'You have not liked this post!' });
          }

          // Remove user ID from likes array
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          if (removeIndex !== -1) post.likes.splice(removeIndex, 1);

          // Save post with updated likes array
          return post.save().then(newPost => res.json(newPost));
        })
        // If post with passed ID not exists response 404 with error
        .catch(() => res.status(404).json({ postnotfound: 'Post not found!' }));
    });
});

/**
 * @route   POST api/posts/comment/:id
 * @desc    Add comment to post by its ID
 * @access  Private
 */
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Response 400 with errors if input values are not valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // In 'posts' collection, find post posts with ID passed in parameters
  return Post.findById(req.params.id)
    .then((post) => {
      const newComment = {
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id,
      };

      // Add new comment to comment array
      post.comments.unshift(newComment);

      // Save post with updated comments array
      post.save().then(newPost => res.json(newPost));
    })
    // If post with passed ID not exists response 404 with error
    .catch(() => res.status(404).json({ postnotfound: 'No post found!' }));
});

/* eslint-disable no-underscore-dangle */
/**
 * @route   DELETE api/posts/comment/:id/:comment_id
 * @desc    Delete comment from post
 * @access  Private
 */
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // In 'posts' collection, find post posts with ID passed in parameters
  Post.findById(req.params.id)
    .then((post) => {
      // In comments array, find comment with passed ID
      const commentFromRequest = post.comments.filter(comment => (
        comment._id.toString() === req.params.comment_id
      ));

      if (commentFromRequest.length === 0) {
        // If comment with passed ID not exists response 404 with error
        return res.status(404).json({ commentnotexists: 'Comment not exists' });
      }

      // From comments array remove comment with passed ID
      const removeIndex = post.comments.map(item => (
        item._id.toString().indexOf(req.params.comment_id)
      ));

      post.comments.splice(removeIndex, 1);

      // Save post with updated comments array
      return post.save().then(newPost => res.json(newPost));
    })
    // If post with passed ID not exists response 404 with error
    .catch(() => res.status(404).json({ postnotfound: 'No post found!' }));
});

module.exports = router;
