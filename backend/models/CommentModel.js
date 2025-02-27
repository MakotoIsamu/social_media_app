const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: {type: String, required: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
})

module.exports = mongoose.model('Comment', CommentSchema)
