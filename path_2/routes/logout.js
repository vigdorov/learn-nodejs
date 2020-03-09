var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        location.reload();
    });
});

module.exports = router;
