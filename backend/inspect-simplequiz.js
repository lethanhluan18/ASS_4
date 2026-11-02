const mongoose = require('mongoose');

async function inspectSimpleQuiz() {
  const conn = await mongoose.connect('mongodb://127.0.0.1:27017/SimpleQuiz');
  
  const users = await conn.connection.db.collection('users').find().toArray();
  console.log('--- SimpleQuiz USERS ---');
  console.log(JSON.stringify(users, null, 2));

  const questions = await conn.connection.db.collection('questions').find().toArray();
  console.log('--- SimpleQuiz QUESTIONS ---');
  console.log('Count:', questions.length);
  if (questions.length > 0) {
    console.log(JSON.stringify(questions.slice(0, 3), null, 2));
  }

  const quizzes = await conn.connection.db.collection('quizzes').find().toArray();
  console.log('--- SimpleQuiz QUIZZES ---');
  console.log(JSON.stringify(quizzes, null, 2));

  process.exit(0);
}

inspectSimpleQuiz().catch(console.error);

