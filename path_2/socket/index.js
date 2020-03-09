const async = require('async');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');

const config = require('../config');
const {HttpError} = require('../error');
const {User} = require('../models/user');

const sessionStore = require('../lib/sessionStore');

const loadSession = (sid, callback) => {
    sessionStore.load(sid, function (err, session) {
        if (arguments.length === 0) {
            return callback(null, null);
        } else {
            return callback(null, session);
        }
    });
};

const loadUser = (session, callback) => {
    if (!session.user) {
        return callback(null, null);
    }

    User.findById(session.user, (err, user) => {
        if (err) {
            return callback(err);
        }

        if (!user) {
            return callback(null, null);
        }

        callback(null, user);
    });
};

module.exports = function (server) {
    const io = require('socket.io').listen(server);

    io.set('authorization', (handshake, mainCallback) => {
        async.waterfall([
            (callback) => {
                handshake.cookies = cookie.parse(handshake.headers.cookie || '');
                const sidCookie = handshake.cookies[config.get('session:key')];
                const sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));

                loadSession(sid, callback);
            },
            (session, callback) => {
                if (!session) {
                    return callback(new HttpError(401, 'No Session'));
                }

                handshake.session = session;
                loadUser(session, callback);
            },
            (user, callback) => {
                if (!user) {
                    return callback(new HttpError(403, 'Anonymous session may not connect'));
                }
                handshake.user = user;
                callback(null);
            }
        ], err => {
            if (!err) {
                return mainCallback(null, true);
            }

            if (err instanceof HttpError) {
                return mainCallback(null, false);
            }

            mainCallback(err);
        });
    });

    io.sockets.on('connection', socket => {
        const {username} = socket.request.user;
        socket.broadcast.emit('join', username);

        socket.on('message', (text, callback) => {
            socket.broadcast.emit('message', {username, text});
            callback({username, text});
        });

        socket.on('disconnect', () => {
            socket.broadcast.emit('leave', username);
        });
    });

    return io;
};
