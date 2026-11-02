const mongoose = require('mongoose');
const crypto = require('crypto');

function verifyPassword(password, salt, hash) {
  return new Promise((resolve) => {
    crypto.pbkdf2(password, salt, 25000, 512, 'sha256', (err, key) => {
      if (err) return resolve(false);
      resolve(key.toString('hex') === hash);
    });
  });
}

async function findPasswords() {
  const conn = await mongoose.connect('mongodb://127.0.0.1:27017/SimpleQuiz');
  const users = await conn.connection.db.collection('users').find().toArray();
  const candidates = ['123', '123456', 'admin', 'password', 'user1', 'admin1', '1234', 'admin123', 'Mary', 'John'];
  
  for (const u of users) {
    if (u.salt && u.hash) {
      let found = null;
      for (const c of candidates) {
        if (await verifyPassword(c, u.salt, u.hash)) {
          found = c;
          break;
        }
      }
      console.log(`User in SimpleQuiz: "${u.username}", admin: ${u.admin}, found password: "${found}"`);
    } else {
      console.log(`User: ${u.username}, no salt/hash`);
    }
  }
  process.exit(0);
}

findPasswords().catch(console.error);

