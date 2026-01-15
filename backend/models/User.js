const bcrypt = require('bcryptjs');
const { userDB } = require('../database/db');

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.gender = data.gender;
    this.phone = data.phone;
    this.age = data.age;
    this.profession = data.profession;
    this.hobbies = data.hobbies || [];
    this.isPaid = data.isPaid || false;
    this.paymentAmount = data.paymentAmount || (data.gender === 'male' ? 100 : 50);
    this.createdAt = data.createdAt;
    this.profilePhoto = data.profilePhoto;
  }

  // Hash password before saving
  async save() {
    if (this.password && !this.password.startsWith('$2a$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    return await userDB.create(this);
  }

  // Compare password
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Static methods
  static async findOne(query) {
    if (query.email) {
      return await userDB.findByEmail(query.email);
    }
    return null;
  }

  static async findById(id) {
    return await userDB.findById(id);
  }
}

module.exports = User;