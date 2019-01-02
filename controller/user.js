var User = require('../models/user');

// create a user
exports.create = function(req, res) {
    var newUser = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    console.log(newUser);

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
