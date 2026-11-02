import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeaderNav from '../components/HeaderNav';
import { fetchQuestions } from '../redux/questionSlice';
import { fetchArticles } from '../redux/articleSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { questions } = useSelector((state) => state.questions);
  const { articles } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div className="container" style={{ maxWidth: '980px' }}>
      <HeaderNav />

      {/* Admin Home Dashboard Overview */}
      <div className="mt-4 p-4 border rounded bg-white">
        <h3 className="fw-semibold mb-3">Welcome to Admin Dashboard, {user?.username || 'Mary'}!</h3>
        <p className="text-secondary fs-6">
          From this panel, you have full administrative control to create, update, and manage quiz questions and articles.
        </p>

        <div className="row g-4 mt-2">
          {/* Card 1: Questions */}
          <div className="col-md-6">
            <div className="card h-100 p-4 border rounded-3 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="fw-bold text-primary m-0">Manage Questions</h4>
                <span className="badge bg-primary fs-6">{questions.length} Questions</span>
              </div>
              <p className="text-secondary mt-2">
                Add new quiz questions with multiple options and designate correct answers, or edit/delete existing questions.
              </p>
              <div className="mt-auto pt-3">
                <Link to="/admin/questions" className="btn btn-primary px-4">
                  Open Questions Manager
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Articles */}
          <div className="col-md-6">
            <div className="card h-100 p-4 border rounded-3 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="fw-bold text-success m-0">Manage Articles</h4>
                <span className="badge bg-success fs-6">{articles.length} Articles</span>
              </div>
              <p className="text-secondary mt-2">
                Publish articles and learning materials for students and users of the application.
              </p>
              <div className="mt-auto pt-3">
                <Link to="/admin/articles" className="btn btn-success px-4">
                  Open Articles Manager
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

