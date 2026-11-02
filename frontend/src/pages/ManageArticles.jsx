import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderNav from '../components/HeaderNav';
import {
  fetchArticles,
  addArticle,
  deleteArticle,
  clearArticleMessages,
} from '../redux/articleSlice';

const ManageArticles = () => {
  const dispatch = useDispatch();
  const { articles, loading, error, successMessage } = useSelector(
    (state) => state.articles
  );

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide both title and content.');
      return;
    }

    dispatch(addArticle({ title: title.trim(), content: content.trim() }));
    setTitle('');
    setContent('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      dispatch(deleteArticle(id));
    }
  };

  return (
    <div className="container" style={{ maxWidth: '980px' }}>
      <HeaderNav />

      <div className="py-2">
        <h2 className="fw-semibold mb-4" style={{ fontSize: '2rem', color: '#1a1a1a' }}>
          Manage Articles
        </h2>

        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch(clearArticleMessages())}
            ></button>
          </div>
        )}

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch(clearArticleMessages())}
            ></button>
          </div>
        )}

        {/* Add Article Form */}
        <form onSubmit={handleSubmit} className="mb-5 p-4 border rounded bg-white">
          <h4 className="fw-semibold mb-3">Add New Article</h4>
          <div className="mb-3">
            <label className="form-label text-secondary">Article Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Tips for Aceing Multiple Choice Quizzes"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary">Content</label>
            <textarea
              className="form-control"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write article content here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary px-4"
            style={{ backgroundColor: '#1a73e8', borderColor: '#1a73e8' }}
            disabled={loading}
          >
            Add Article
          </button>
        </form>

        {/* Articles List */}
        <div className="mt-4 border-top pt-4">
          <h4 className="fw-semibold mb-3">Existing Articles ({articles.length})</h4>
          {loading && articles.length === 0 ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center text-muted py-4">No articles added yet.</div>
          ) : (
            articles.map((art) => (
              <div
                key={art._id}
                className="card p-3 mb-3 border rounded-3 bg-white"
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="fw-bold mb-1">{art.title}</h5>
                    <div className="text-muted small mb-2">By {art.author || 'Admin'}</div>
                    <p className="mb-0 text-secondary">{art.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(art._id)}
                    className="btn btn-outline-danger btn-sm ms-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageArticles;

