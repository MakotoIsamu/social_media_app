const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/UserModel');
const authenticateToken = require('../middlewares/Authentication')

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields required' });
    }

    try {
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ 
                error: 'Username already exist' // Generic message for security
            });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ 
                error: 'Email already exist' // Generic message for security
            });
        }

        // Use a higher work factor for better security
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = new User({
            username: username.toLowerCase(), // Store lowercase for case-insensitive lookups
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await user.save();

        // Don't send back the full user object
        res.status(201).json({ 
            message: 'Registration successful',
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User doesn't exist" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, name: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({
            message: 'Login successful',
            token, // Return the token to the client
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Get user ID from the authenticated token
        const userId = req.user._id;
        
        // Find user by ID but exclude password
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in /profile route:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.get('/checkAuth', authenticateToken, (req, res) => {
    res.status(200).json({ authenticated: true, user: req.user });
});

module.exports = router;
