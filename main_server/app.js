const keys = require('./api/config/keys');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const userRouter = require('./api/routes/user');

mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to mongodb');
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/user', userRouter);

module.exports = app;