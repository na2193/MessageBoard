var User = require('../models/user');
var bcrypt = require('bcryptjs');

// create a user
exports.create = function(req, res) {
    var newUser = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    console.log('User being passed from the front end is -> \n' + newUser);

    User.createUser(newUser, function(err, user) {
        if(err) {
            console.log(err);
            res.status(400).send('Failed to register User');
        }
        else {
            res.status(200).send('Successfully created User ' + user);
        }
    });
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

exports.findUserByIdAndUpdate = function(req, res) {
    // need to hash the password before updating it
    bcrypt.genSalt(10, function(err, salt) {
        if(err)
            console.log(err);
    
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err)
                console.log(err);
            
            req.body.password = hash;

            User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
                if(err)
                    res.status(500).send(err);
            
                res.status(200).send('Successfully Updated!');
            });
        });
    });
}

exports.validateLoginCredentials = function(req, res) {
    
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