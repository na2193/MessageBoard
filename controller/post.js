var Post = require('../models/post');
var Comment = require('../models/comment');

// create a new post
exports.createNewPost = function(req, res) {
    let post = new Post({ // limited in scope, that's why used let
        title: req.body.title,
        detail: req.body.detail,
        user: req.user
    });

    post.save(function(post, err) {
        if(err) {
            res.send({
                success: false,
                err: err,
                message: 'Failed to create the new post -> ' + err 
            });
        }
        else {
            res.send({
                success: true,
                post: post,
                message: 'Successfully saved the newly created post'
            });
        }
        
    });
    console.log('Post is -> ' + post);
} 

// delete a post
exports.deletePost = function(req, res) {
    Post.findByIdAndDelete(req.params.id, function(err, post) {
        if(err) {
            res.send({
                success: false,
                err: err,
                message: 'Failed to delete post -> ' + err 
            });
        }
        if(!post) {
            res.send({
                success: false,
                post: post,
                message: 'Cannot find post with id -> ' + req.params.id
            });
        }
        else {
            res.send({
                success: true,
                post: post,
                message: 'Successfully deleted post'
            });
        }
    });
}

// update a post
exports.updatePost = function(req, res) {
    Post.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            detail: req.body.detail
        }},{ 
            upsert:true 
        }, function(err, post) {
            if(err) {
                res.send({
                    success: false,
                    post: post,
                    err: err,
                    message: 'Failed to update post -> ' + err 
                });
            }
            else {
                res.send({
                    success: true,
                    message: 'Successfully updated post!'
                });
            }
        }
    );
}

exports.addComment = function(req, res) {
    
}





// mark a post as done

// add comments for that post












/*
comment: [{
            commentorUsername: req.body.comment.commentorUsername,
            commentorComment: req.body.comment.commentorComment,
            commentDate: req.body.comment.commentDate,
            commentPosition: req.body.comment.commentPosition
        }]
*/