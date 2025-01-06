const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')

// Register a new user
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.json({message: 'All fields required'})
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        const newUser = await user.save()
        res.status(201).json({message: 'Signup successful'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Login a user
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({message: 'All fields required'})
    }
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.json({message: "User doesn't exist"})
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.json({message: "Invalid password"})
        }
        req.session.userId = user._id
        res.status(200).json({message: 'Login successful'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Check auth
router.get('/checkAuth', async (req, res) => {
    if(req.session && req.session.userId) {
       return res.json({message: true})
    }
    return res.json({message: false})
})

// Logout a user
router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({message: 'Error logging out'})
        }
        res.clearCookie('connect-sid')
        res.status(200).json({message: 'User logged out'})
    })
})

module.exports = router;