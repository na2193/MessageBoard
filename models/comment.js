var mongoose = require('mongoose');
var datetime = require('node-datetime');

var CommentSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: datetime,
        required: true
    },
    commentPosition: { // this is like who commented first, second, etc so it'll be easier to display
        type: Number,
        required: true
    }
}); 

var Post = module.exports = mongoose.model('Comment', CommentSchema);
