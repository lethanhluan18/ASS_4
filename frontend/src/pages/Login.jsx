import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, role } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, role, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    dispatch(loginUser({ username: username.trim(), password }));
  };

  // Quick credentials filler for testing convenience
  const fillCredentials = (user, pass) => {
    setUsername(user);
    setPassword(pass);
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
          Login
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
              placeholder="Username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary mb-1">Password</label>
            <input
              type="password"
              className="form-control form-control-lg fs-6"
              style={{ borderColor: '#d1d5db', padding: '10px 14px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
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
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center mt-2">
            <Link
              to="/register"
              className="text-decoration-none"
              style={{ color: '#1a73e8', fontSize: '0.95rem' }}
            >
              Don't have an account? Register here
            </Link>
          </div>
        </form>

        {/* Demo Helper Pill */}
        <div className="mt-4 pt-3 border-top text-center text-muted" style={{ fontSize: '0.85rem' }}>
          <div className="mb-2 text-primary fw-medium">
            Mật khẩu mặc định: <strong>123</strong> (hoặc <strong>password123</strong>)
          </div>
          <span>Bấm để điền nhanh: </span>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm py-0 px-2 me-1"
            onClick={() => fillCredentials('John', '123')}
          >
            John (User)
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm py-0 px-2 me-1"
            onClick={() => fillCredentials('Mary', '123')}
          >
            Mary (Admin)
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm py-0 px-2"
            onClick={() => fillCredentials('admin', '123')}
          >
            admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

