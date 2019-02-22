var mongoose = require('mongoose');
var datetime = require('node-datetime');

var PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    comment: [{
        commentorUsername: {
            type: String,
            required: true
        },
        commentorComment: {
            type: String,
            required: true
        },
        commentDate:{ // check if this works, don't know
            type: datetime,
            required: true
        },
        commentPosition: { // this is like who commented first, second, etc so it'll be easier to display
            type: Number,
            required: true
        }
    }]
}); 

var Post = module.exports = mongoose.model('Post', PostSchema);
