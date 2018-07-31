// Packages
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
// Routes
const users = require('../api/routes/users');
const profiles = require('../api/routes/profiles');
const posts = require('../api/routes/posts');
// MongoDB URI
const databaseConfig = require('../config/keys').mongodbUri;
// Passport configuration function
const configurePassport = require('../config/passport.js');

// Initialize Express server
const app = express();
// Set server port
const port = process.env.PORT || 5000;
// Define paths to landing page and client static files
const clientPath = path.resolve(__dirname, '..', 'client', 'dist');
const landingPath = path.resolve(__dirname, '..', 'landing', 'dist');
// Configure Passport
// Passport is authentication middleware - its purpose is to authenticate requests.
// This API is using Passport with JWT Strategy - check "config/passport.js" file for more info
configurePassport(passport);

// Use CORS
// Using CORS allows the server to get requests from other domains
// than the one on which the server is running and response to them
app.use(cors());
// Use Body Parser
// bodyParser.json() extracts the entire body portion of an incoming request stream,
// parses it as JSON and exposes it on "req.body"
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Use Passport
app.use(passport.initialize());
// Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

// Connect to MongoDB trough Mongoose
mongoose.connect(databaseConfig, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected.');
  })
  .catch((error) => {
    console.log(error);
  });

// As default, use landing page static files path
app.use(express.static(landingPath));

// For "/" route respond with landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(landingPath, 'index.html'));
});
// For "/app" and "/app/*" routes respond with client
app.get(['/app', '/app/*'], (req, res) => {
  // Change to client static files path
  app.use(express.static(clientPath));
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Listens for connections on the specified port
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
