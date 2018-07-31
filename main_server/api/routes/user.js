const expres = require('express');
const mongoose = require('mongoose');
const router = expres.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    User.find({}, function (err, users) {
        if(err) {
            res.status(401).json(err);
        } else {
            res.status(200).json(users);
        }
    })
});

router.get('/:userId', (req, res) => {
    const userid = req.params.userId;
    res.status(200).json({
        message: 'Handling GET request to /user/ID',
        id: userid
    });
});

router.post('/', (req, res) => {
    var id = mongoose.Types.ObjectId();
    const newUser = new User({
        _id: id,
        name: req.body.name
    })
    newUser.save().then((doc) => {
        res.status(201).send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

module.exports = router;