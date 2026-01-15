const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get user profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update profile
router.put('/update', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: req.body },
            { new: true }
        ).select('-password');
        
        res.json({ message: 'Profile updated', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Browse profiles (opposite gender, paid users)
router.get('/browse', auth, async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId);
        const oppositeGender = currentUser.gender === 'male' ? 'female' : 'male';
        
        const profiles = await User.find({
            gender: oppositeGender,
            isPaid: true
        }).select('name age profession hobbies profilePhoto');
        
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Upload photo
router.post('/upload-photo', auth, async (req, res) => {
    try {
        const { photoUrl } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            { profilePhoto: photoUrl },
            { new: true }
        ).select('-password');
        
        res.json({ message: 'Photo uploaded', profilePhoto: user.profilePhoto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;