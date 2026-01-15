const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { paymentDB } = require('../database/db');

// Process payment (dummy implementation for testing)
router.post('/process', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.isPaid) return res.status(400).json({ error: 'Already paid' });

        // Simulate payment processing delay
        setTimeout(async () => {
            try {
                // Mark user as paid
                user.isPaid = true;
                await user.save();

                // Create payment record
                await paymentDB.create({
                    userId: req.userId,
                    amount: user.paymentAmount,
                    transactionId: `TXN${Date.now()}`,
                    status: 'completed',
                    method: 'dummy_payment'
                });

                console.log(`Payment processed for user ${user.id}: ${user.paymentAmount} KSH`);
            } catch (error) {
                console.error('Error processing payment:', error);
            }
        }, 1000); // 1 second delay to simulate processing

        // Return success immediately (payment processing continues in background)
        res.json({
            message: `Payment of ${user.paymentAmount} KSH initiated! Processing...`,
            transactionId: `TXN${Date.now()}`,
            amount: user.paymentAmount,
            status: 'processing'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check payment status
router.get('/status', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({
            isPaid: user.isPaid,
            amount: user.paymentAmount,
            gender: user.gender
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get payment history
router.get('/history', auth, async (req, res) => {
    try {
        const payments = await paymentDB.getByUserId(req.userId);
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Simulate instant payment completion (for testing)
router.post('/complete-test-payment', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Mark as paid immediately
        user.isPaid = true;
        await user.save();

        // Create payment record
        await paymentDB.create({
            userId: req.userId,
            amount: user.paymentAmount,
            transactionId: `TEST${Date.now()}`,
            status: 'completed',
            method: 'test_payment'
        });

        res.json({
            message: `Test payment of ${user.paymentAmount} KSH completed!`,
            transactionId: `TEST${Date.now()}`,
            amount: user.paymentAmount,
            isPaid: true
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

module.exports = router;