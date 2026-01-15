const bcrypt = require('bcryptjs');
const { userDB } = require('../database/db');

class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.gender = data.gender || '';
    this.phone = data.phone || '';
    this.age = data.age || '';
    this.profession = data.profession || '';
    this.hobbies = data.hobbies || [];
    this.isPaid = data.isPaid || false;
    this.paymentAmount = data.paymentAmount || (data.gender === 'male' ? 100 : 50);
    this.createdAt = data.createdAt || null;
    this.profilePhoto = data.profilePhoto || null;
  }

  // Hash password before saving
  async save() {
    if (this.password && !this.password.startsWith('$2a$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    const savedUser = await userDB.create(this);
    // Update this instance with the saved data
    Object.assign(this, savedUser);
    return this;
  }

  // Compare password
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Static methods
  static async findOne(query) {
    if (query.email) {
      const userData = await userDB.findByEmail(query.email);
      return userData ? new User(userData) : null;
    }
    return null;
  }

  static async findById(id) {
    const userData = await userDB.findById(id);
    return userData ? new User(userData) : null;
  }
}

module.exports = User;