const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Private
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions');
    return res.json(quizzes);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get quiz by ID
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    return res.json(quiz);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Create a quiz
// @route   POST /api/quizzes
// @access  Private/Admin
const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Quiz title is required' });
    }

    const quiz = await Quiz.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      questions: Array.isArray(questions) ? questions : [],
    });

    const populatedQuiz = await Quiz.findById(quiz._id).populate('questions');
    return res.status(201).json(populatedQuiz);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update a quiz
// @route   PUT /api/quizzes/:id
// @access  Private/Admin
const updateQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({ message: 'Quiz title cannot be empty' });
      }
      quiz.title = title.trim();
    }

    if (description !== undefined) {
      quiz.description = description.trim();
    }

    if (questions !== undefined && Array.isArray(questions)) {
      quiz.questions = questions;
    }

    await quiz.save();
    const updated = await Quiz.findById(quiz._id).populate('questions');
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete a quiz
// @route   DELETE /api/quizzes/:id
// @access  Private/Admin
const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    await Quiz.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Quiz deleted successfully', id: req.params.id });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};

