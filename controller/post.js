var Post = require('../models/post');

// create a new post
exports.createNewPost = function(req, res) {
    post = new Post({
        title: req.body.title,
        detail: req.body.detail,
        comment: [
            commentorUsername = req.body.comment.commentorUsername,
            commentorComment = req.body.comment.commentorComment,
            commentDate = req.body.comment.commentDate,
            commentPosition = req.body.comment.commentPosition
        ]
    });

    console.log('Post is -> ' + post);
} 