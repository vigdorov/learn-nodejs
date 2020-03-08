var express = require('express');
var router = express.Router();

const {User} = require('../models/user');
const makeObjectID = require('../utils/makeObjectID');

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find({}, (err, users) => {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
});

router.get('/:id', makeObjectID);

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

module.exports = router;
