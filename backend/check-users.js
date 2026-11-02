const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function check() {
  await mongoose.connect('mongodb://127.0.0.1:27017/quiz_app');
  const users = await User.find();
  console.log('Total users:', users.length);
  for (const u of users) {
    const is123 = await bcrypt.compare('123', u.password);
    console.log(`- Username: "${u.username}", role: ${u.role}, matches "123": ${is123}`);
  }
  process.exit(0);
}

check().catch(console.error);

