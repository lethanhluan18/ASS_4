const mongoose = require('mongoose');

async function inspectUsers() {
  const conn = await mongoose.connect('mongodb://127.0.0.1:27017/quiz_app');
  const users = await conn.connection.db.collection('users').find().toArray();
  console.log('Current users in quiz_app:');
  console.log(JSON.stringify(users, null, 2));
  process.exit(0);
}

inspectUsers().catch(console.error);

