var Post = require('../models/post');
var posts = require('../controller/post');

module.exports = function(app) {
    app.post('/createNewPost', posts.createNewPost);
}