import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderNav from '../components/HeaderNav';

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container" style={{ maxWidth: '980px' }}>
      <HeaderNav />

      {/* Main Home Content */}
      <div className="mt-4 p-4 border rounded bg-white">
        <h3 className="fw-semibold mb-3">Welcome to the Quiz Application, {user?.username}!</h3>
        <p className="text-muted fs-6">
          Test your knowledge with our interactive quizzes or explore helpful articles.
        </p>

        <div className="row g-4 mt-2">
          <div className="col-md-6">
            <div className="card h-100 p-4 border rounded-3 bg-light">
              <h4 className="fw-bold text-primary">Take a Quiz</h4>
              <p className="text-secondary mt-2">
                Challenge yourself with a series of multiple-choice questions and see your final score.
              </p>
              <div className="mt-auto pt-3">
                <Link to="/dashboard/quiz" className="btn btn-primary px-4">
                  Start Quiz
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 p-4 border rounded-3 bg-light">
              <h4 className="fw-bold text-success">Read Articles</h4>
              <p className="text-secondary mt-2">
                Expand your understanding and prepare for quizzes by reading our educational articles.
              </p>
              <div className="mt-auto pt-3">
                <Link to="/dashboard/article" className="btn btn-outline-success px-4">
                  View Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

