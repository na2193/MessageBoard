var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
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
    password: String
});


var options = ({missingPasswordError: "Wrong password"});
UserSchema.plugin(passportLocalMongoose, options);


var User = module.exports = mongoose.model('User', UserSchema);

