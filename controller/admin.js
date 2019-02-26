var User = require('../models/user');
var Post = require('../models/post');

exports.checkIfAdmin = function(req, res, next) {
    if(req.isAuthenticated() && req.user.isAdmin) {
        console.log('User is authenticated and is ADMIN');
        next();
    }
    else {
        console.log('User is NOT authenticated and is ADMIN');
        res.send({
            success: false,
            message: 'User is NOT authenticated and is ADMIN'
        });
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

exports.findUserByIdAndUpdate = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        user.setPassword(req.body.password, function() {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.username = req.body.username;
            user.password = req.body.password;
            user.isAdmin = req.body.isAdmin;

            user.save(function(err) {
                res.status(200).send('Successfully Updated!');
            });
        })
    }); 
}

exports.loggedInUserTimeStamp = function(req, res) {
    var sessions = req.sessionStore.sessions
    console.log(sessions);
}

exports.getAllPosts = function(req, res) {
    Post.find({}, function (err, post) {
        if(err) {
            res.send({
                success: false,
                err: err,
                message: 'Failed to retrieve all posts -> ' + err 
            });
        }
        else {
            res.send({
                success: true,
                post: post,
                message: 'Successfully retrieved all posts'
            });
        }
        console.log('All Posts:');
        console.log(post);
    });
}