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

exports.checkAuthentication = function(req, res, next) {
    if(req.isAuthenticated()) {
        console.log('User is authenticated');
        next();
    }
    else {
        console.log('User is NOT authenticated');
        res.redirect('/login');
    }
}

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

exports.findUserBySession = function(req, res) {
    // getting the current user who logged in from session
    var currentUser = req.user;
    console.log("The user logged in is -> " + currentUser);

    if(currentUser != null) {
        // this user will go to the front end to display in the fields so that the user can see
        res.status(200).send('Current Logged in User -> ' + currentUser);
    }
    else {
        res.status(401).send('Cannot find Logged in user!');
    }
}

exports.updateUserProfileBySession = function(req, res) {
    var currentUser = req.user;
    console.log("The user logged in is -> " + currentUser);

    if(currentUser != null) {
        User.findById(req.user.id, function(err, user) {
            user.setPassword(req.body.password, function() {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.password = req.body.password;

                // if username is present or sent, send error message
                if(req.body.username) {
                    console.log('Username is not editable');
                    res.status(500).send('Username is not editable');
                }
                else {
                    user.save(function(err) {
                        if(err) {
                            res.status(500).send('Error saving');
                        }
                        res.status(200).send('Successfully Updated!');
                    });
                }
            });
        });
    }
    else {
        res.status(401).send('Cannot find Logged in user!');
    }
}

exports.deleteUserAccount = function(req, res) {
    var currentUser = req.user;
    console.log("The user logged in is -> " + currentUser);

    if(currentUser != null) {
        User.findByIdAndRemove(req.user.id, function(err, user) {
            if(err) {
                console.log(err);
                res.status(500).send('Error! -> ' + err);
            }

            if(!user) {
                console.log('Cannot find User with id -> ' + req.user.id);
                res.status(404).send('Cannot find User with id -> ' + req.user.id);
            }
            else {
                console.log('Deleted User with id -> ' + req.user.id);
                res.send('Deleted User -> \n' + currentUser + ' \nSuccessfully!');
            }
        });
    }
    else {
        res.status(401).send('Cannot find Logged in user!');
    }
}
