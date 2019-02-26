var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}); 

var Post = module.exports = mongoose.model('Post', PostSchema);
