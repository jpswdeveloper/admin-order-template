import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack
} from "@mui/material";
import MaterialTable from "../components/materials";

const MaterialsPage = () => {
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
        height: "100%",
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        // overflow: "hidden",
      }}
    >
      {/* Header Section - takes 20% of height */}
      <Box
        sx={{
          display: "flex",
          // alignItems: "center",
          backgroundColor: "white",
          boxShadow: 1,
          // p: 2,
          // height:'5%'
          
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
                Materials Dashboard
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Manage all materials
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
          width:"100%",          
        }}
      >
       <Container
          maxWidth={false}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            width:"calc(100vw - 240px)",
            p:3
          }}
        >
          <MaterialTable />
        </Container>
      </Box>
    </Box>
  );
};

export default MaterialsPage;