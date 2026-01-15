const User = require('./models/User');

async function testLogin() {
  console.log('Testing login...');

  // Try to find the user
  const user = await User.findOne({ email: 'joelluke100@gmail.com' });
  console.log('User found:', user);
  console.log('User type:', typeof user);
  console.log('Has comparePassword:', typeof user?.comparePassword);

  if (user) {
    // Try to compare password
    try {
      const result = await user.comparePassword('somepassword');
      console.log('Password comparison result:', result);
    } catch (error) {
      console.log('Error comparing password:', error.message);
    }
  }
}

testLogin().catch(console.error);