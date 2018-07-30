const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const userRouter = require('./api/routes/user');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/user', userRouter);

module.exports = app;