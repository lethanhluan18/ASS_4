import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../redux/authSlice';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, role: authRole } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (authRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, authRole, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    dispatch(registerUser({ username: username.trim(), password, role }));
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div
        className="card p-4 p-md-5 border shadow-none"
        style={{
          width: '100%',
          maxWidth: '430px',
          borderColor: '#e5e7eb',
          borderRadius: '8px',
        }}
      >
        <h2 className="text-center mb-4 fw-normal" style={{ fontSize: '1.85rem' }}>
          Register
        </h2>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary mb-1">Username</label>
            <input
              type="text"
              className="form-control form-control-lg fs-6"
              style={{ borderColor: '#d1d5db', padding: '10px 14px' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary mb-1">Password</label>
            <input
              type="password"
              className="form-control form-control-lg fs-6"
              style={{ borderColor: '#d1d5db', padding: '10px 14px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary mb-1">Account Role</label>
            <select
              className="form-select form-select-lg fs-6"
              style={{ borderColor: '#d1d5db', padding: '10px 14px' }}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User (can take quizzes)</option>
              <option value="admin">Admin (can manage quizzes & questions)</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 mb-3"
            style={{
              backgroundColor: '#1a73e8',
              borderColor: '#1a73e8',
              fontSize: '1rem',
              fontWeight: '500',
            }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>

          <div className="text-center mt-2">
            <Link
              to="/login"
              className="text-decoration-none"
              style={{ color: '#1a73e8', fontSize: '0.95rem' }}
            >
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

