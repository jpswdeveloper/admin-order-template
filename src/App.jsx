import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Login";
import OrdersPage from "./pages/OrdersPage";

const App = () => {
  // Check authentication status from localStorage
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <OrdersPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Redirect any unknown paths */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;