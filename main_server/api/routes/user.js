const expres = require('express');
const router = expres.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Handling GET request to /user'
    });
});

router.get('/:userId', (req, res) => {
    const userid = req.params.userId;
    res.status(200).json({
        message: 'Handling GET request to /user/ID',
        id: userid
    });
});

module.exports = router;