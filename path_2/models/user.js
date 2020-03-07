const crypto = require('crypto');

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

schema.method.encryptPassword = password => {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(password => {
        this._plainPassword = password;
        this.salt = Math.random + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(() => this._plainPassword);

schema.method.checkPassword = password => {
    return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongoose.model('User', schema);
