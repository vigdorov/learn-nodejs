var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    const sid = req.session.id;
    const io = res.app.get('io');
    req.session.destroy(err => {
        console.log(io.emit)
        io.emit('session:reload', sid);

        if (err) {
            return next(err);
        }
    });
});

module.exports = router;
