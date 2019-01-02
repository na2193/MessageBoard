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
            newUser.save(callback);
           
        });
    });
}
