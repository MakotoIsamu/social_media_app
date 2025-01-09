const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String},
    username: {type: String, lowercase: true, trim: true , required: true},
    profilePicture: {type: String},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: Number}
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)