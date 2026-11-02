const mongoose = require('mongoose');

async function listDbs() {
  const conn = await mongoose.connect('mongodb://127.0.0.1:27017/quiz_app');
  const admin = conn.connection.db.admin();
  const dbs = await admin.listDatabases();
  console.log('Databases:', dbs.databases.map(d => d.name));
  
  // Check users collection in quiz_app
  const users = await conn.connection.db.collection('users').find().toArray();
  console.log('Users in quiz_app db:');
  console.log(users.map(u => ({ username: u.username, role: u.role, passwordPreview: u.password.substring(0, 15) })));

  // Also check if there are other collections or databases related to quiz
  for (const d of dbs.databases) {
    if (d.name !== 'admin' && d.name !== 'config' && d.name !== 'local') {
      const dbInstance = conn.connection.client.db(d.name);
      const cols = await dbInstance.listCollections().toArray();
      console.log(`DB "${d.name}" collections:`, cols.map(c => c.name));
      if (cols.some(c => c.name === 'users')) {
        const uList = await dbInstance.collection('users').find().toArray();
        console.log(`Users in "${d.name}":`, uList.map(u => ({ username: u.username, role: u.role, pass: u.password })));
      }
    }
  }

  process.exit(0);
}

listDbs().catch(console.error);

