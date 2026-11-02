import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderNav from '../components/HeaderNav';
import { fetchArticles } from '../redux/articleSlice';

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div className="container" style={{ maxWidth: '980px' }}>
      <HeaderNav />

      <div className="py-2">
        <h2 className="fw-semibold mb-4" style={{ fontSize: '2rem' }}>
          Articles
        </h2>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-4 text-muted">No articles available.</div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {articles.map((art) => (
              <div key={art._id} className="card p-4 border rounded-3 bg-white">
                <h4 className="fw-bold mb-2">{art.title}</h4>
                <div className="text-muted small mb-3">By {art.author || 'Admin'}</div>
                <p className="mb-0" style={{ lineHeight: '1.6' }}>
                  {art.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;

