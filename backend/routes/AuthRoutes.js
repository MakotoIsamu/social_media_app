const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/UserModel');

// Secret key for signing JWT
const JWT_SECRET = 'your_secret_key'; // Replace with a strong secret key

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        const newUser = await user.save();
        res.status(201).json({ message: 'Signup successful', user: newUser });
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
            { userId: user._id, email: user.email },
            JWT_SECRET,
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

// Middleware to verify token
function authenticateToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Attach user info to request
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
}

// Protected route (example)
router.get('/checkAuth', authenticateToken, (req, res) => {
    res.status(200).json({ authenticated: true, user: req.user });
});

module.exports = router;
