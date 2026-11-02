const express = require('express');
const router = express.Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articleController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getArticles)
  .post(adminOnly, createArticle);

router.route('/:id')
  .delete(adminOnly, deleteArticle);

module.exports = router;

