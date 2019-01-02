module.exports = function(app) {
    var users = require('../controller/user');

    // create a new user
    app.post('/register', users.create);

    // get all users
    app.get('/users', users.findAllUsers);

    // get user by id
    app.get('/users/:id', users.findUserById);

    // delete user by id
    app.delete('/users/:id', users.findUserByIdAndDelete);

    // update a user by id
    app.post('/users/update/:id', users.findUserByIdAndUpdate);

    // validate login credentials
    app.post('/login');
}