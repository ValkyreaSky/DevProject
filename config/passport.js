// Passport strategy for authenticating with JWT
const JtwStrategy = require('passport-jwt').Strategy;
// JWT extractor functions
const { ExtractJwt } = require('passport-jwt');
// Model
const User = require('../api/models/User');
// JWT secret key
const { secretOrKey } = require('../config/keys');

// Strategy options
const opts = {
  // JWT can be included in a request in many ways. This API sends to user JWT in
  // "Bearer" scheme, e.g. "Bearer eyJhbGciOiJIUzI1Ni..." and user sends back
  // same token in "Authorization" header. Thats why we are using "fromAuthHeaderAsBearerToken"
  // function for extraction of JWT token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // JWT secret key to verify token
  secretOrKey,
};

module.exports = (passport) => {
  // In every private route data encrypted in JWT token stored in "Authorization header" will
  // be extracted (see strategy options) and available as "jwtPayload"
  passport.use(new JtwStrategy(opts, (jwtPayload, done) => {
    // Find user with ID same as ID from token
    User.findById(jwtPayload.id)
      .then((user) => {
        // If user was found, authenticate request by calling "done" function.
        // Found user data we will be available as "req.user" in private routes
        // becouse it is passed to "done" function
        if (user) {
          return done(null, user);
        }
        // Return error (Unauthorized 401) if user was not found
        return done(null, false);
      })
      // Return error if something gone wrong
      .catch(err => done(err));
  }));
};
