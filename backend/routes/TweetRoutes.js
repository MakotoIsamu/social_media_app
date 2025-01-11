const express = require('express');
const Tweet = require('../models/TweetModel');
const authenticateToken = require('../middlewares/Authentication')
const router = express.Router();

// Get all Tweets
router.get('/', async (req, res) => {
    try {
        const tweets = await Tweet.find()
            .populate('user', 'name username profilePicture')
            .sort({ createdAt: -1 }); // Sort by newest first
        
        if (!tweets || tweets.length === 0) {
            return res.status(200).json([]); // Return empty array if no posts
        }
        
        res.status(200).json(tweets);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ 
            message: 'Failed to fetch tweets',
            error: error.message 
        });
    }
});

// Get a tweet by user
router.get('/my-tweets', authenticateToken, async (req, res) => {
    const userId = req.user._id
    try {
        const tweets = await Tweet.find({ user: userId });
        res.status(200).json(tweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get tweets by userId
router.get('/get-tweets-by-user/:id', async (req, res) => {
    try {
        const tweets = await Tweet.find({user: req.params.id})
        res.status(200).json(tweets)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// Create a tweet
router.post('/add', authenticateToken, async (req, res) => {
    try {
        const { tweet } = req.body;
        if(!tweet){
            return res.status(400).json({ message: 'Tweet is required' });
        }
        const userId = req.user._id
        const newTweet = new Tweet({
            user: userId,
            tweet,
        });
        await newTweet.save()
        res.status(201).json({message: 'Tweet created successful'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Delete a tweet
router.delete('/delete/:id', async (req, res) => {
    try {
        const tweet = await Tweet.findByIdAndDelete(req.params.id);
        if (!tweet) {
            return res.status(404).json({ error: 'Error deleting tweet' });
        }
        res.status(200).json({ message: 'Tweet deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;