// Packages
const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
// Models
const User = require('../models/User');
// SecretOrKey
const { secretOrKey } = require('../../config/keys');
// Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

/**
 * @route   POST api/users/register
 * @desc    Register user
 * @access  Public
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Return 400 response with errors if input values are not valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // In 'users' collection, find User with email matching email sent in request body
  return User.findOne({ email: req.body.email })
    .then((user) => {
      // If User with that email exists response 400 with error
      if (user) {
        errors.email = 'Email already exists!';
        return res.status(400).json(errors);
      }

      // Get Gravatar for requested email
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm', // Default (mystery man)
      });

      // Create new User object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      // Encrypt password
      return bcrypt.genSalt(10, (saltErr, salt) => {
        bcrypt.hash(newUser.password, salt, (hashErr, hash) => {
          if (hashErr) throw Error(hashErr);

          newUser.password = hash;

          // Save new User in database
          newUser.save()
            // Send back JSON object with new user data
            .then(userCreated => res.json(userCreated))
            .catch(error => res.status(400).json((error)));
        });
      });
    })
    .catch(error => res.status(400).json((error)));
});

/**
 * @route   GET api/users/login
 * @desc    Login user / Return JWT Token
 * @access  Public
 */
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Return 400 response with errors if input values are not valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // In 'users' collection, find User with email matching email sent in request body
  return User.findOne({ email })
    .then((user) => {
      // If User with that email not exists response 404 with error
      if (!user) {
        errors.email = 'User not found!';
        return res.status(404).json(errors);
      }

      // Match found user password with password sent in request body
      return bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // If passwords maches, create JWT payload (this data will be encrypted in token)
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            };

            // Sign (encrypt) and return the token (expiresIn unit is second)
            return jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (error, token) => {
              res.json({ success: true, token: `Bearer ${token}` });
            });
          }
          errors.password = 'Password incorrect!';
          return res.status(400).json(errors);
        })
        .catch(error => res.status(400).json((error)));
    });
});

/**
 * @route   GET api/users/current
 * @desc    Return current user data
 * @access  Private
 */
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Send user ID, name and email
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});

module.exports = router;
