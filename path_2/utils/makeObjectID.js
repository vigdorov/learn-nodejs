const {ObjectID} = require('mongodb');

const {HttpError} = require('../error');

const makeObjectID = (req, res, next) => {
    const id = req.params.id;
    try {
        new ObjectID(id);
        next();
    } catch (e) {
        return next(new HttpError(404, `User id "${id}" is Not Found`));
    }
};

module.exports = makeObjectID;
