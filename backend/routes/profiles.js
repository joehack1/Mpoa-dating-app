const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get user profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update profile
router.put('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Update user properties
        Object.assign(user, req.body);
        await user.save();

        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.json({ message: 'Profile updated', user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Browse profiles (all users except current, for paid users)
router.get('/', auth, async (req, res) => {
    try {
        const profiles = await userDB.getAllExcept(req.userId);
        res.json(profiles.map(profile => {
            const { password, ...profileWithoutPassword } = profile;
            return profileWithoutPassword;
        }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Like profile
router.post('/:id/like', auth, async (req, res) => {
    try {
        // For now, just return success
        res.json({ message: 'Profile liked' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;