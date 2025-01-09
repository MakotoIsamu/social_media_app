const express = require('express')
const authenticateToken = require('../middlewares/Authentication')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const User = require('../models/UserModel')
const router = express.Router()

// Multer and Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'social_media_app/profilePicture',
        allowedFormats: ['jpg', 'jpeg', 'png']
    }
})

const upload = multer({storage})

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// Get a single user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({error: 'User not found'})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// Update a user
router.put('/edit', authenticateToken, upload.single('profilePicture'), async (req, res) => {
    const {name, username, phoneNumber} = req.body
    const userId = req.user._id
    
    try {
        // Get the image URL from Cloudinary response
        const updateData = {
            name,
            username,
            phoneNumber,
        }
        
        // Only add profilePicture if a file was uploaded
        if (req.file) {
            updateData.profilePicture = req.file.path
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true } // This returns the updated document
        )

        if(!user){
            return res.status(404).json({error: 'User not found'})
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;
