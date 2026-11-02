import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import QuizPage from './pages/QuizPage';
import ArticlePage from './pages/ArticlePage';
import AdminDashboard from './pages/AdminDashboard';
import ManageQuestions from './pages/ManageQuestions';
import ManageArticles from './pages/ManageArticles';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* User protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/quiz"
        element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/article"
        element={
          <ProtectedRoute>
            <ArticlePage />
          </ProtectedRoute>
        }
      />

      {/* Admin protected routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/questions"
        element={
          <ProtectedRoute adminOnly={true}>
            <ManageQuestions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/articles"
        element={
          <ProtectedRoute adminOnly={true}>
            <ManageArticles />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              isAuthenticated
                ? role === 'admin'
                  ? '/admin'
                  : '/dashboard'
                : '/login'
            }
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;

