var express = require('express');


var {AuthError, HttpError} = require('../error');
var router = express.Router();

const {User} = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('./layout/login', {title: 'Express'});
});

router.post('/', function (req, res, next) {
    const {username, password} = req.body;

    User.authorize(username, password, (err, user) => {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});
    });
});

module.exports = router;
