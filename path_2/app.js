var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var sessionStore = require('./lib/sessionStore');
var loadUser = require('./middleware/loadUser');
var checkAuth = require('./middleware/checkAuth');
var config = require('./config');
var {HttpError} = require('./error');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();

app.engine('ejs', require('ejs-locals'));

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: config.get('session:secret'),
    cookie: config.get('session:cookie'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    store: sessionStore,
}));

app.use(loadUser);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', checkAuth, usersRouter);
app.use('/chat', checkAuth, chatRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
