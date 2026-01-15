const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Database file
const file = path.join(dbDir, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, {
  users: [],
  payments: [],
  messages: []
});

// Initialize database
async function initDB() {
  await db.read();
  if (!db.data.users) db.data.users = [];
  if (!db.data.payments) db.data.payments = [];
  if (!db.data.messages) db.data.messages = [];
  await db.write();
}

// User operations
const userDB = {
  // Create user
  async create(userData) {
    await db.read();
    const user = {
      id: Date.now().toString(),
      ...userData,
      isPaid: false,
      paymentAmount: userData.gender === 'male' ? 100 : 50,
      createdAt: new Date().toISOString(),
      profilePhoto: null
    };
    db.data.users.push(user);
    await db.write();
    return user;
  },

  // Find user by email
  async findByEmail(email) {
    await db.read();
    return db.data.users.find(user => user.email === email);
  },

  // Find user by ID
  async findById(id) {
    await db.read();
    return db.data.users.find(user => user.id === id);
  },

  // Update user
  async update(id, updateData) {
    await db.read();
    const userIndex = db.data.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      db.data.users[userIndex] = { ...db.data.users[userIndex], ...updateData };
      await db.write();
      return db.data.users[userIndex];
    }
    return null;
  },

  // Get all users except current user
  async getAllExcept(currentUserId) {
    await db.read();
    return db.data.users.filter(user => user.id !== currentUserId);
  },

  // Get all users
  async getAll() {
    await db.read();
    return db.data.users;
  }
};

// Payment operations
const paymentDB = {
  // Create payment
  async create(paymentData) {
    await db.read();
    const payment = {
      id: Date.now().toString(),
      ...paymentData,
      createdAt: new Date().toISOString()
    };
    db.data.payments.push(payment);
    await db.write();
    return payment;
  },

  // Get payments by user ID
  async getByUserId(userId) {
    await db.read();
    return db.data.payments.filter(payment => payment.userId === userId);
  }
};

module.exports = {
  initDB,
  userDB,
  paymentDB
};