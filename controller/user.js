var User = require('../models/user');
// remove these 3
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var passport = require('../config/passport');

// create a user 
exports.register = function(req, res) {
    User.register(new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
        
    }), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        else {
            //res.status(200).send('Successfully created User');
            res.send({
                success: true,
                user: user
            });
        }
    });
};

exports.login = function(req, res, next) {
    User.authenticate()(req.body.username, req.body.password, function(err, user, options) {
        if(err)
            return next(err);

        if(user === false) {
            res.send({
                message: options.message,
                success: false
            });
        }
        else {
            req.login(user, function(err) {
                res.send({
                    success: true,
                    user: user
                });
            });
        }
    });
};

exports.findAllUsers = function(req, res) {
    User.find({}, function (err, user) {
        console.log('All Users:');
        console.log(user);
        res.send(user);
    });
}

exports.findUserById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            console.log(err);
        }
        if(!user) {
            console.log('Cannot find User with id -> ' + req.params.id);
            res.send('Cannot find User with id -> ' + req.params.id);
        }
        else {
            console.log('Found User with id -> ' + req.params.id);
            res.send(user);
        }
    });
}

exports.findUserByIdAndDelete = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if(err) {
            console.log(err);
        }
        if(!user) {
            console.log('Cannot find User with id -> ' + req.params.id);
            res.send('Cannot find User with id -> ' + req.params.id);
        }
        else {
            console.log('Found User with id -> ' + req.params.id);
            res.send('Deleted User -> \n' + user + ' \nSuccessfully!');
        }
    });
}

// doesn't update the hashed password correctly
exports.findUserByIdAndUpdate = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        user.setPassword(req.body.password, function() {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.username = req.body.username;
            user.password = req.body.password;

            user.save(function(err) {
                res.status(200).send('Successfully Updated!');
            });
        })

    }); 
}

findUserByEmail = function(req, callback) {
    User.find({email: req.body.email}, function(err, user) {
        if(err)
            console.log(err);
        if(!user) {
            console.log('Cannot find User with email -> ' + req.body.email);
        }
        else {
            console.log('Found User with email -> ' + email);
        }
    });
}