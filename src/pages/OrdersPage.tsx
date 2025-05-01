import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrdersTable from "../components/ordersTable";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack
} from "@mui/material";

const OrdersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Double-check authentication on component mount
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    // Force a full page reload to reset all state
    window.location.href = "/login";
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header Section - takes 20% of height */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          boxShadow: 1,
          p: 2
        }}
      >
        <Container maxWidth={false} sx={{ height: "100%" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Orders Dashboard
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Manage all customer orders
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                py: 1
              }}
            >
              Logout
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Table Section - takes 80% of height */}
      <Box
        sx={{
          height: "80%",
          overflow: "hidden",
          p: 2
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 2
          }}
        >
          <OrdersTable />
        </Container>
      </Box>
    </Box>
  );
};

export default OrdersPage;