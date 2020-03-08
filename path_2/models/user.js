const crypto = require('crypto');
const uuid = require('uuid');
const async = require('async');

const {AuthError} = require('../error');
const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = uuid.v4() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(() => this._plainPassword);

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function (username, password, authCallback) {
    const User = this;

    async.waterfall([
        (callback) => {
            User.findOne({username}, callback);
        },
        (user, callback) => {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    return authCallback(new AuthError('Неверный пароль'));
                }
            } else {
                const user = new User({username, password});
                user.save(err => {
                    if (err) {
                        return authCallback(err);
                    }
                    callback(null, user);
                });
            }
        }
    ], authCallback);
};

exports.User = mongoose.model('User', schema);
