const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get a single user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Create a user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Update a user
router.put('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password
    try {
        const updatedUser = await user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Delete a user
router.delete('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    await user.remove()
    res.json({message: 'User deleted'})
})

module.exports = router;
