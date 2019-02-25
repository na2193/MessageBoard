var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var crypto = require('crypto');

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
    password: String,
    isAdmin: Boolean // need to modify everything and test it
});

// need these to bottom functions to hash the password
UserSchema.pre('save',
    function(next) {
        if (this.password) {
            var md5 = crypto.createHash('md5');
            this.password = md5.update(this.password).digest('hex');
        }
        next();
    }
);

UserSchema.methods.authenticate = function(password) {
    var md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');

    return this.password === md5;
};

var options = ({missingPasswordError: "Wrong password"});
UserSchema.plugin(passportLocalMongoose, options);


var User = module.exports = mongoose.model('User', UserSchema);

