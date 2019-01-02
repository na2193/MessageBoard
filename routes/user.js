module.exports = function(app) {
    var users = require('../controller/user');

    // create a new user
    app.post('/register', users.create);
}