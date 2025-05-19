import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LoginPage from "./pages/Login";
import OrdersPage from "./pages/OrdersPage";
import MaterialsPage from "./pages/MaterialsPage";
import Sidebar from "./components/sidebar";
import { Box, CssBaseline, Toolbar } from "@mui/material";

const App = () => {
  // Check authentication status from localStorage
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  return (
    <Router>
      <Box sx={{ display: "flex",height:'100vh',overflowY:'hidden' }}>
        <CssBaseline />
        <Sidebar />
        <Box  sx={{ flexGrow: 1, p:1 }}>
          <Toolbar />
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
              }
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
            <Route
              path="/materials"
              element={
                isAuthenticated ? (
                  <MaterialsPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Redirect any unknown paths */}
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/" : "/login"} replace />
              }
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
