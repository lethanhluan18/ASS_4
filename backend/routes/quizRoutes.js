const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require('../controllers/quizController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getQuizzes)
  .post(adminOnly, createQuiz);

router.route('/:id')
  .get(getQuizById)
  .put(adminOnly, updateQuiz)
  .delete(adminOnly, deleteQuiz);

module.exports = router;

