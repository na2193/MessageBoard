var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

// function to create a new user and hash the password
module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if(err) {
            console.log(err);
        }
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) {
                console.log(err);
            }
            newUser.password = hash;

            // before saving the user, need to check if the user already exits, for some reason the pre function doesn't work so create my own  
            checkDuplicate(newUser, function(err, user) {
                if(err)
                    console.log(err);

                if(user) {
                    console.log('Email already exists: ');
                }

                newUser.save(callback);
            });
           
        });
    });
}

function checkDuplicate(newUser, callback) {
    console.log('Checking if this user already exists -> ' + newUser.username);
    User.find({email: newUser.email}, function(err, user) {
        if(err) {
            console.log(err);
        }
        else if(user) {
            console.log('Email already exists: ', newUser.email);
        }
        else {
            console.log('Creating user -> ' + newUser);
        }
    });
}

