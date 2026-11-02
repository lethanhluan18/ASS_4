const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  submitAnswer,
} = require('../controllers/questionController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All question routes require authentication
router.use(protect);

router.route('/')
  .get(getQuestions)
  .post(adminOnly, createQuestion);

router.route('/:id')
  .get(getQuestionById)
  .put(adminOnly, updateQuestion)
  .delete(adminOnly, deleteQuestion);

router.post('/:id/answer', submitAnswer);

module.exports = router;

