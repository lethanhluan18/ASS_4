const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Question = require('./models/Question');
const Quiz = require('./models/Quiz');
const Article = require('./models/Article');

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quiz_app';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] Connected to MongoDB at', MONGODB_URI);

    // Clean existing data
    await User.deleteMany({});
    await Question.deleteMany({});
    await Quiz.deleteMany({});
    await Article.deleteMany({});
    console.log('[Seed] Cleared existing data');

    // Create users (password: '123' and fallback 'password123')
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123', salt);

    const userList = [
      { username: 'John', password: hashedPassword, role: 'user' },
      { username: 'Mary', password: hashedPassword, role: 'admin' },
      { username: 'admin', password: hashedPassword, role: 'admin' },
      { username: 'admin1', password: hashedPassword, role: 'admin' },
      { username: 'user1', password: hashedPassword, role: 'user' },
      { username: 'user2', password: hashedPassword, role: 'user' },
    ];

    await User.insertMany(userList);
    console.log('[Seed] Created default users:');
    userList.forEach((u) => {
      console.log(` - ${u.username} (${u.role}) / password: 123`);
    });

    // Create default questions exactly as shown in screenshot
    const questionDefinitions = [
      {
        questionText: 'Who developed the theory of relativity?',
        options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Nikola Tesla'],
        correctAnswerIndex: 0,
      },
      {
        questionText: 'What is the symbol for iron on the periodic table?',
        options: ['Fe', 'I', 'Au', 'Ag'],
        correctAnswerIndex: 0,
      },
      {
        questionText: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswerIndex: 0,
      },
      {
        questionText: 'What is the capital of England?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswerIndex: 1,
      },
      {
        questionText: 'What is the capital of Germany?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswerIndex: 2,
      },
    ];

    const createdQuestions = await Question.insertMany(questionDefinitions);
    console.log(`[Seed] Created ${createdQuestions.length} questions`);

    // Create default quiz
    const quiz = await Quiz.create({
      title: 'General Knowledge Quiz',
      description: 'A fun quiz testing various general knowledge topics',
      questions: createdQuestions.map((q) => q._id),
    });

    // Update questions with quizId
    await Question.updateMany(
      { _id: { $in: createdQuestions.map((q) => q._id) } },
      { $set: { quizId: quiz._id } }
    );
    console.log(`[Seed] Created quiz: "${quiz.title}" with ID: ${quiz._id}`);

    // Create sample article
    await Article.create({
      title: 'The Benefits of Online Quizzing in Education',
      content:
        'Online quizzes offer students an interactive and engaging method to test their understanding in real-time. Immediate feedback helps reinforce learning points and pinpoint areas for improvement.',
      author: 'Mary',
    });
    console.log('[Seed] Created sample article');

    console.log('[Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
