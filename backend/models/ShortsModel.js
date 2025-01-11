const mongoose = require('mongoose')

const shortsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    caption: {type: String, required: true},
    video: {type: String, required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Likes' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Shorts', shortsSchema)