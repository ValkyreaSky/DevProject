// Packages
const express = require('express');
const passport = require('passport');
// Models
const User = require('../models/User');
const Profile = require('../models/Profile');
// Input validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

const router = express.Router();

/**
 * @route   GET api/profiles
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  // In 'profiles' collection, find profile with user ID same as user ID from JWT token
  Profile.findOne({ user: req.user.id })
    // To
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      // Response 404 with error if profile not found
      if (!profile) {
        errors.noprofile = 'There is no profile for this user!';
        return res.status(404).json(errors);
      }

      // Response with profile
      return res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route   GET api/profiles/handle/:handle
 * @desc    Get profile by handle
 * @access  Public
 */
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route   GET api/profiles/user/:user_id
 * @desc    Get profile by id
 * @access  Public
 */
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(() => {
      errors.noprofile = 'There is no profile for this user';
      res.status(404).json(errors);
    });
});

/**
 * @route   GET api/profiles/all
 * @desc    Get all profiles
 * @access  Public
 */
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofiles = 'There is no profiles';
        return res.status(404).json(errors);
      }

      return res.json(profiles);
    })
    .catch(() => {
      errors.noprofiles = 'There is no profiles';
      res.status(404).json(errors);
    });
});

/**
 * @route   POST api/profiles
 * @desc    Create or edit user profile
 * @access  Private
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.company) { profileFields.company = req.body.company; } else { profileFields.company = ''; }
  if (req.body.website) { profileFields.website = req.body.website; } else { profileFields.website = ''; }
  if (req.body.location) { profileFields.location = req.body.location; } else { profileFields.location = ''; }
  if (req.body.bio) { profileFields.bio = req.body.bio; } else { profileFields.bio = ''; }
  if (req.body.githubUsername) { profileFields.githubUsername = req.body.githubUsername; } else { profileFields.githubUsername = ''; }

  // Skills - split into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  return Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
          .then(updatedProfile => res.json(updatedProfile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
          .then((profile) => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }

            // Save profile
            new Profile(profileFields).save().then(newProfile => res.json(newProfile));
          });
      }
    });
});

/**
 * @route   POST api/profiles/experience
 * @desc    Add experience to profile
 * @access  Private
 */
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  return Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        from: req.body.from,
        location: req.body.location,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to experiences array
      profile.experience.unshift(newExp);

      profile.save().then(newProfile => res.json(newProfile));
    });
});

/**
 * @route   POST api/profiles/education
 * @desc    Add education to profile
 * @access  Private
 */
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  return Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to experiences array
      profile.education.unshift(newEdu);

      profile.save().then(newProfile => res.json(newProfile));
    });
});

/**
 * @route   DELETE api/profiles/experience/:exp_id
 * @desc    Delete experience from profile
 * @access  Private
 */
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      // Splice out of array
      if (removeIndex !== -1) profile.experience.splice(removeIndex, 1);

      // Save
      profile.save().then(newProfile => res.json(newProfile));
    })
    .catch(err => res.status(404).json(err));
});


/**
 * @route   DELETE api/profiles/education/:edu_id
 * @desc    Delete education from profile
 * @access  Private
 */
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      // Splice out of array
      if (removeIndex !== -1) profile.education.splice(removeIndex, 1);

      // Save
      profile.save().then(newProfile => res.json(newProfile));
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route   DELETE api/profiles
 * @desc    Delete user and profile
 * @access  Private
 */
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
