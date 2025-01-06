const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: {type: String, required: true},
    image: [{type: String}],
    video: {type: String},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
}, {
    timestamps: true
} ) 

module.exports = mongoose.model('Post', PostSchema)