import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const HeaderNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);
  const isAdmin = role === 'admin';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="mb-4">
      {/* Top Title and Welcome */}
      <div className="d-flex justify-content-between align-items-center pt-4 pb-3">
        <h1 className="fw-bold m-0" style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>
          {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
        </h1>
        <div className="fs-5" style={{ color: '#333' }}>
          Welcome, {user?.username || (isAdmin ? 'Mary' : 'John')}
        </div>
      </div>

      {/* Nav Menu Bar */}
      <nav
        className="px-4 py-3 d-flex align-items-center gap-4"
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '1.05rem',
        }}
      >
        {isAdmin ? (
          <>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? 'text-dark fw-medium' : 'text-secondary'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/admin/questions"
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? 'text-dark fw-medium' : 'text-secondary'
                }`
              }
            >
              Manage Questions
            </NavLink>
            <NavLink
              to="/admin/articles"
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? 'text-dark fw-medium' : 'text-secondary'
                }`
              }
            >
              Manage Articles
            </NavLink>
            <button
              onClick={handleLogout}
              className="btn btn-link text-secondary text-decoration-none p-0 border-0"
              style={{ fontSize: 'inherit', verticalAlign: 'baseline' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? 'text-dark fw-medium' : 'text-secondary'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard/quiz"
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? 'text-dark fw-medium' : 'text-secondary'
                }`
              }
            >
              Quiz
            </NavLink>
            <NavLink
              to="/dashboard/article"
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? 'text-dark fw-medium' : 'text-secondary'
                }`
              }
            >
              Article
            </NavLink>
            <button
              onClick={handleLogout}
              className="btn btn-link text-secondary text-decoration-none p-0 border-0"
              style={{ fontSize: 'inherit', verticalAlign: 'baseline' }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default HeaderNav;

