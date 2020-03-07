const async = require('async');

const mongoose = require('../lib/mongoose');

const openConnection = callback => {
    mongoose.connection.on('open', callback);
};

const dropDatabase = callback => {
    const db = mongoose.connection.db;
    db.dropDatabase(callback);
};

const createUsers = callback => {
    const {User} = require('../models/user');
    
    const users = [
        {username: 'Вася', password: 'super'},
        {username: 'Петя', password: '123'},
        {username: 'admin', password: 'truehero'},
    ];

    async.parallel(users.map(userData => parallelCallback => {
        const user = new User(userData);
        user.save(err => {
            parallelCallback(err, user);
        });
    }), callback);
};

const closeConnection = callback => {
    mongoose.disconnect(callback);
};

async.series([
    openConnection,
    dropDatabase,
    createUsers,
    closeConnection,
], err => {
    if (err) {
        throw err;
    }
});
