const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tweet: {type: String, required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Likes' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Tweet', tweetSchema)