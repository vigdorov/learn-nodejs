const {User} = require('../models/user');

module.exports = function(req, res, next) {
    res.locals.user = null;
    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user, (err, user) => {
        if (err) {
            return next(err);
        }

        req.user = user;
        res.locals.user = user;
        next();
    });
};
