// Packages
const path = require('path');
const express = require('express');

// Initialize Express server
const app = express();
// Set server port
const port = process.env.PORT || 3000;

// Define paths to landing page and client static files
const publicPath = path.resolve(__dirname, '..', 'client', 'dist');
const landingPath = path.resolve(__dirname, '..', 'landing', 'dist');

// As default use landing page static file path
app.use(express.static(landingPath));

// For "/" route respond with landing page
app.get('', (req,res) => {
  res.sendFile(path.join(landingPath, 'index.html'));
});
// For "/app/*" route respond with client
app.get('/app/*', (req, res) => {
  // Change to client static files path
  app.use(express.static(publicPath));
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Listens for connections on the specified port
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
