const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Simulate payment for testing
router.post('/simulate-payment', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.isPaid) return res.status(400).json({ error: 'Already paid' });
        
        const paymentAmount = user.gender === 'male' ? 100 : 50;
        
        // Simulate payment
        setTimeout(async () => {
            user.isPaid = true;
            await user.save();
            
            res.json({
                message: `Payment of ${paymentAmount} KSH successful!`,
                transactionId: `TEST${Date.now()}`,
                amount: paymentAmount,
                isPaid: true
            });
        }, 2000);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check payment status
router.get('/status', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('isPaid paymentAmount gender');
        res.json({
            isPaid: user.isPaid,
            amount: user.paymentAmount,
            gender: user.gender
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark as paid (admin/manual)
router.post('/mark-paid', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        user.isPaid = true;
        await user.save();
        
        res.json({
            message: 'Account activated',
            isPaid: true,
            amount: user.paymentAmount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;