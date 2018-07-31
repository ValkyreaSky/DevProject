<div align="center">
  <a href="https://github.com/appalaszynski/devplace">
    <img src="https://user-images.githubusercontent.com/35331661/42627962-dcfef1b2-85ce-11e8-9f90-bc6b4ab35b94.png" height="125px">
  </a>
  <h1>Devplace</h1>
  <p>
    <em>Social Network for Developers Built with React</em>
  </p>
  <br>
</div>

**Devplace** is a social network for developers. This project is based on free part of Brad Traversy course which I found on the internet while searching for some cool, free API server - I didn't want to make another simple "to-do-like" application, but a little bit more complicated, useful, real-world application with advanced routing, user authentication, forms management, etc. Devplace API is made following the course instructions (because for now, I'm fully focused on front end) but React client is made 100% by me, based on screenshots of ready application. In the end, making API server in Node.js from scratch gave me a lot of experience and now I understand how it all works together.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Installation

Clone the repo and install dependencies.

```bash
$ git clone https://github.com/appalaszynski/devplace.git
$ cd devplace
$ npm install:all # Install both server and client dependencies
```

API server uses MongoDB database. You should create `keys_dev.js` file in `/config` directory, exporting `mongodbUri` and `secretOrKey`.

```javascript
module.exports = {
  mongodbUri: 'mongodb://username:password.mlab.com:55309/database',
  secretOrKey: 'verySecret',
};

```

In production you should make them available by `MONGO_URI` and `SECRET_OR_KEY` configuration variables on cloud platform of your choise.

---

## Usage

### Running Development Server

```bash
$ npm run dev:server # Run API server
$ npm run dev:client # Run client server
$ npm run dev:all # Run both API and client server
```

### Deploying Locally

```bash
$ npm run build:dev # Build in development mode
$ npm run build:prod # Build in production mode (minified files versions, external stylesheets)
```

### Deploying on Heroku

First You should install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

```bash
$ heroku login # Login to your Heroku account
$ cd MyApp
$ git init # Initialize a Git repository (ignore if already exists)
$ heroku git:remote -a your-app-name # Add remote Git repository
$ heroku config:set NPM_CONFIG_PRODUCTION=false # Force Heroku to install devDependencies
$ git add .
$ git commit -m "Nice commit message"
$ git push heroku master
```

---

## Contributing

All contributions and suggestions are welcome! For suggested improvements, please create an [issue](https://github.com/appalaszynski/devplace/issues). For direct contributions, please [fork](https://github.com/appalaszynski/devplace/fork) the repository, create your feature branch, commit your changes, push commits to the branch and create a new [pull request](https://github.com/appalaszynski/devplace/pulls).
