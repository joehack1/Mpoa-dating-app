const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { userDB, paymentDB } = require('../database/db');

// Process payment
router.post('/process', auth, async (req, res) => {
    try {
        const user = await userDB.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.isPaid) return res.status(400).json({ error: 'Already paid' });

        // Mark user as paid
        await userDB.update(req.userId, { isPaid: true });

        // Create payment record
        await paymentDB.create({
            userId: req.userId,
            amount: user.paymentAmount,
            transactionId: `TXN${Date.now()}`,
            status: 'completed'
        });

        res.json({
            message: `Payment of ${user.paymentAmount} KSH successful!`,
            transactionId: `TXN${Date.now()}`,
            amount: user.paymentAmount,
            isPaid: true
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check payment status
router.get('/status', auth, async (req, res) => {
    try {
        const user = await userDB.findById(req.userId);
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

module.exports = router;
        
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