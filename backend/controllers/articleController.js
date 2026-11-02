const Article = require('../models/Article');

// @desc    Get all articles
// @route   GET /api/articles
// @access  Private
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    return res.json(articles);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Create an article
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const article = await Article.create({
      title: title.trim(),
      content: content.trim(),
      author: req.user ? req.user.username : 'Admin',
    });

    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await Article.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Article deleted successfully', id: req.params.id });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = { getArticles, createArticle, deleteArticle };

