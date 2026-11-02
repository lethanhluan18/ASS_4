const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

// @desc    Get all questions
// @route   GET /api/questions
// @access  Private (any authenticated user)
const getQuestions = async (req, res) => {
  try {
    const { quizId } = req.query;
    const filter = quizId ? { quizId } : {};
    const questions = await Question.find(filter).sort({ createdAt: -1 });
    return res.json(questions);
  } catch (error) {
    console.error('getQuestions error:', error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get question by ID
// @route   GET /api/questions/:id
// @access  Private
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private/Admin
const createQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswerIndex, quizId } = req.body;

    if (!questionText || !questionText.trim()) {
      return res.status(400).json({ message: 'Question text is required' });
    }

    if (!Array.isArray(options) || options.length < 2) {
      return res
        .status(400)
        .json({ message: 'At least 2 options are required' });
    }

    // Clean options: trim and remove empty strings if any
    const trimmedOptions = options.map((opt) => (opt ? opt.toString().trim() : '')).filter(Boolean);
    if (trimmedOptions.length < 2) {
      return res
        .status(400)
        .json({ message: 'At least 2 non-empty options are required' });
    }

    const parsedIndex = parseInt(correctAnswerIndex, 10);
    if (
      isNaN(parsedIndex) ||
      parsedIndex < 0 ||
      parsedIndex >= trimmedOptions.length
    ) {
      return res.status(400).json({
        message: `Correct answer index must be between 0 and ${
          trimmedOptions.length - 1
        }`,
      });
    }

    const question = await Question.create({
      questionText: questionText.trim(),
      options: trimmedOptions,
      correctAnswerIndex: parsedIndex,
      quizId: quizId || null,
    });

    // If quizId was provided, link question into Quiz
    if (quizId) {
      await Quiz.findByIdAndUpdate(quizId, {
        $addToSet: { questions: question._id },
      });
    }

    return res.status(201).json(question);
  } catch (error) {
    console.error('createQuestion error:', error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private/Admin
const updateQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswerIndex, quizId } = req.body;

    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (questionText !== undefined) {
      if (!questionText.trim()) {
        return res.status(400).json({ message: 'Question text cannot be empty' });
      }
      question.questionText = questionText.trim();
    }

    let currentOptions = question.options;
    if (options !== undefined) {
      if (!Array.isArray(options) || options.length < 2) {
        return res
          .status(400)
          .json({ message: 'At least 2 options are required' });
      }
      const trimmedOptions = options
        .map((opt) => (opt ? opt.toString().trim() : ''))
        .filter(Boolean);
      if (trimmedOptions.length < 2) {
        return res
          .status(400)
          .json({ message: 'At least 2 non-empty options are required' });
      }
      question.options = trimmedOptions;
      currentOptions = trimmedOptions;
    }

    if (correctAnswerIndex !== undefined) {
      const parsedIndex = parseInt(correctAnswerIndex, 10);
      if (
        isNaN(parsedIndex) ||
        parsedIndex < 0 ||
        parsedIndex >= currentOptions.length
      ) {
        return res.status(400).json({
          message: `Correct answer index must be between 0 and ${
            currentOptions.length - 1
          }`,
        });
      }
      question.correctAnswerIndex = parsedIndex;
    }

    if (quizId !== undefined) {
      question.quizId = quizId || null;
    }

    const updatedQuestion = await question.save();
    return res.json(updatedQuestion);
  } catch (error) {
    console.error('updateQuestion error:', error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Remove from any quizzes referencing this question
    await Quiz.updateMany(
      { questions: question._id },
      { $pull: { questions: question._id } }
    );

    await Question.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Question deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('deleteQuestion error:', error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Validate an answer for a question
// @route   POST /api/questions/:id/answer
// @access  Private
const submitAnswer = async (req, res) => {
  try {
    const { selectedOptionIndex } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const isCorrect = question.correctAnswerIndex === parseInt(selectedOptionIndex, 10);
    return res.json({
      isCorrect,
      correctAnswerIndex: question.correctAnswerIndex,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  submitAnswer,
};

