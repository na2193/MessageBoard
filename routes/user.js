var mongoose = require('mongoose');
var User = require('../models/user');

var users = require('../controller/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function(app) {
    //var users = require('../controller/user');
     //initialize passport
     passport.use(User.createStrategy());
     // use static serialize and deserialize of model for passport session support
     passport.serializeUser(User.serializeUser());
     passport.deserializeUser(User.deserializeUser());

    //need this according to passport guide for sessions
    app.use(cookieParser());
    app.use(session({
        secret: 'the princess and the frog',
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // create a new user
    app.post('/register', users.register);

    // get all users
    app.get('/users', users.findAllUsers);

    // get user by id
    app.get('/users/:id', users.findUserById);

    // delete user by id
    app.delete('/users/:id', users.findUserByIdAndDelete);

    // update a user by id
    app.post('/users/update/:id', users.findUserByIdAndUpdate); // need to work on update

    // validate login credentials
    app.post('/login', users.login);
}