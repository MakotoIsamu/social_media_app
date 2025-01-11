const express = require('express');
const Post = require('../models/PostModel');
const multer = require('multer');
const Cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const authenticateToken = require('../middlewares/Authentication')
const router = express.Router();

// Multer and Cloudinary configuration
Cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: Cloudinary,
    params: {
        folder: 'social_media_app/posts',
        allowedFormats: ['jpg', 'jpeg', 'png'],
        transformation: [
            {width: 500, height: 500, crop: 'auto', gravity: 'auto'},
            {quality: '50', fetch_format: 'auto'} // Reduced quality but still maintaining decent image quality
        ]
    }
})

const upload = multer({storage})

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'name username profilePicture')
            .sort({ createdAt: -1 }); // Sort by newest first
        
        if (!posts || posts.length === 0) {
            return res.status(200).json([]); // Return empty array if no posts
        }
        
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ 
            message: 'Failed to fetch posts',
            error: error.message 
        });
    }
});

// Get a post by user
router.get('/my-post', authenticateToken, async (req, res) => {
    const userId = req.user._id
    try {
        const posts = await Post.find({ user: userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get post by userId
router.get('/get-post-by-user/:id', async (req, res) => {
    try {
        const post = await Post.find({user: req.params.id})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// Create a post
router.post('/add', authenticateToken, upload.array('images', 5) , async (req, res) => {
    const {text} = req.body;
    try {
        if(!text){
            return res.status(400).json({ message: 'Text is required' });
        }
        const image_paths = req.files.map(file => file.path)
        const userId = req.user._id
        const post = new Post({
            user: userId,
            text,
            images : image_paths,
        });
        await post.save()
        res.status(201).json({message: 'Post created successful'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Delete a post
router.delete('/delete/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Error deleting post' });
        }
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/like/:id', async (req, res) => {
    const {id} = req.params
    try {
        const post = await Post.findById(id)
        if(!post){
            return res.json({message: 'Post not found'})
        }
        if(post.likes.includes(req.body.userId)){
            return res.json({message: 'Post is already liked'})
        }
        post.likes.push(req.body.userId)
        await post.save();

        res.json({message: 'Post liked successfuly'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;