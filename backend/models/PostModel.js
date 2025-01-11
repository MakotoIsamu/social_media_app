const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: {type: String, required: true},
    images: [{type: String, required: true}],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
}, {
    timestamps: true
} ) 

module.exports = mongoose.model('Post', postSchema)