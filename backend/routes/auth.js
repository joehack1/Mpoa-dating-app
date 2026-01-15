const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, gender, phone, age, profession, hobbies } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });
        
        // Create user
        const user = new User({ name, email, password, gender, phone, age, profession, hobbies });
        await user.save();
        
        // Create token
        const token = jwt.sign({ userId: user.id, gender: user.gender }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                gender: user.gender,
                paymentAmount: user.paymentAmount,
                isPaid: user.isPaid,
                profilePhoto: user.profilePhoto
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
        
        const token = jwt.sign({ userId: user.id, gender: user.gender }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                phone: user.phone,
                age: user.age,
                profession: user.profession,
                hobbies: user.hobbies,
                isPaid: user.isPaid,
                paymentAmount: user.paymentAmount,
                profilePhoto: user.profilePhoto
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;