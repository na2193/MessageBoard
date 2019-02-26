var Post = require('../models/post');
var posts = require('../controller/post');
var User = require('../controller/user');

module.exports = function(app) {
    app.post('/post/createNewPost', User.checkAuthentication, posts.createNewPost);

    app.delete('/post/deletePost/:id', User.checkAuthentication, posts.deletePost);

    app.post('/post/updatePost/:id', User.checkAuthentication, posts.updatePost);
}