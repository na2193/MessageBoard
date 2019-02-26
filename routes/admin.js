var Admin = require('../controller/admin');

module.exports = function(app) {
    app.get('/admin/dashboard', Admin.checkIfAdmin);

    // get all users
    app.get('/admin/users', Admin.checkIfAdmin, Admin.findAllUsers);

    // get user by id
    app.get('/admin/users/:id', Admin.checkIfAdmin, Admin.findUserById);

    // delete user by id
    app.delete('/admin/users/:id', Admin.checkIfAdmin, Admin.findUserByIdAndDelete);

    // update a user by id, can also change a user to admin
    app.post('/admin/users/update/:id', Admin.checkIfAdmin,  Admin.findUserByIdAndUpdate);

    // get report on who logged in and timing
    app.get('/admin/loggedInUserTimeStamp', Admin.loggedInUserTimeStamp);

    // get all posts
    app.get('/admin/posts', Admin.checkIfAdmin, Admin.getAllPosts);
}