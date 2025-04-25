import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrdersTable from "../components/ordersTable";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack
} from "@mui/material";

const OrdersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Double-check authentication on component mount
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    // Force a full page reload to reset all state
    window.location.href = '/login';
  };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        height: "100vh",
        background: `linear-gradient(to bottom right, #0f172a, #1e293b)`,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
            Orders
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Logout
          </Button>
        </Stack>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
          <OrdersTable />
        </Paper>
      </Container>
    </Box>
  );
};

export default OrdersPage;