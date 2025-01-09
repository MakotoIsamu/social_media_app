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
        folder: 'social_media_app',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
})

const upload = multer({storage})

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a post by user
router.get('/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.remove();
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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