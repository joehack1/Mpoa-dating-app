const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    profession: { type: String, required: true },
    hobbies: [{ type: String }],
    profilePhoto: { type: String, default: '' },
    isPaid: { type: Boolean, default: false },
    paymentAmount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Hash password
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.paymentAmount = this.gender === 'male' ? 100 : 50;
    next();
});

// Compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);