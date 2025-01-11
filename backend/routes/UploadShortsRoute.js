const express = require('express');
const Shorts = require('../models/ShortsModel');
const multer = require('multer');
const Cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const authenticateToken = require('../middlewares/Authentication')
const router = express.Router();

// Cloudinary configuration
Cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// Configure storage for video uploads
const storage = new CloudinaryStorage({
    cloudinary: Cloudinary,
    params: {
        folder: 'social_media_app/shorts',
        resource_type: 'video',
        allowed_formats: ['mp4', 'mov', 'avi'], // Common video formats
        transformation: [
            { width: 720, height: 1280, crop: 'fill' }, // Vertical video format
            { quality: 'auto:good' } // Automatic quality optimization
        ]
    }
});

const upload = multer({ storage });

// Get all shorts
router.get('/', async (req, res) => {
    try {
        const shorts = await Shorts.find()
            .populate('user', 'name username profilePicture')
            .sort({ createdAt: -1 });
        
        if (!shorts || shorts.length === 0) {
            return res.status(200).json([]);
        }
        
        res.status(200).json(shorts);
    } catch (error) {
        console.error('Error fetching shorts:', error);
        res.status(500).json({ 
            message: 'Failed to fetch shorts',
            error: error.message 
        });
    }
});

// Get shorts by user
router.get('/my-shorts', authenticateToken, async (req, res) => {
    const userId = req.user._id;
    try {
        const shorts = await Shorts.find({ user: userId });
        res.status(200).json(shorts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get shorts by userId
router.get('/get-shorts-by-user/:id', async (req, res) => {
    try {
        const shorts = await Shorts.find({ user: req.params.id });
        res.status(200).json(shorts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a short
router.post('/add', authenticateToken, upload.single('video'), async (req, res) => {
    const { caption } = req.body;
    try {
        if (!caption) {
            return res.status(400).json({ message: 'Caption is required' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Video is required' });
        }

        const userId = req.user._id;
        const short = new Shorts({
            user: userId,
            caption,
            video: req.file.path,
        });
        
        await short.save();
        res.status(201).json({ message: 'Short created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a short
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const short = await Shorts.findOne({ _id: req.params.id, user: req.user._id });
        if (!short) {
            return res.status(404).json({ error: 'Short not found or unauthorized' });
        }
        
        // Delete from Cloudinary
        const publicId = short.video.split('/').pop().split('.')[0];
        await Cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
        
        await short.deleteOne();
        res.status(200).json({ message: 'Short deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Like/unlike a short
router.put('/like/:id', authenticateToken, async (req, res) => {
    try {
        const short = await Shorts.findById(req.params.id);
        if (!short) {
            return res.status(404).json({ message: 'Short not found' });
        }

        const userId = req.user._id;
        const likeIndex = short.likes.indexOf(userId);

        if (likeIndex === -1) {
            // Like the short
            short.likes.push(userId);
            await short.save();
            res.json({ message: 'Short liked successfully' });
        } else {
            // Unlike the short
            short.likes.splice(likeIndex, 1);
            await short.save();
            res.json({ message: 'Short unliked successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;