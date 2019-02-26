//var mongoose = require('mongoose');
var User = require('../models/user');

var users = require('../controller/user');
var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
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

    

    // validate login credentials
    app.post('/login', users.login);

    // go to the dashboard page only for authenticated users
    //app.get('/dashboard', users.checkAuthentication, users.findAllUsers); // remove users.findAllUsers just testing 

    // logout
    app.get('/logout', function(req, res){
        req.logout();
        res.send({
            success: true,
            message: 'User has Logged Out Succesfully!'
        });
        // NEED to update to bottom instead of send
        //res.redirect('/login'); 
    });

    // get user profile and pre-populate the fields with the ones in the database, useranme is not editable
    app.get('/userProfile', users.checkAuthentication, users.findUserBySession);
    
    // update the user except username
    app.post('/userProfile/update', users.checkAuthentication, users.updateUserProfileBySession);

    // request to delete account
    app.post('/userProfile/delete', users.checkAuthentication, users.deleteUserAccount);
}