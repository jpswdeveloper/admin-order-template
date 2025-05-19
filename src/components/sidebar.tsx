import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { label: "Orders", icon: <HomeIcon />, path: "/" },
  { label: "Materials", icon: <InventoryIcon />, path: "/materials" },
  // { label: "Reports", icon: <BarChartIcon />, path: "/reports" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#000",
          color: "#fff",
        },
      }}
    >
      <Toolbar />
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 64,
        }}
      >
        <Typography variant="h6" color="primary" fontWeight="bold">
          FAST CNC
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={isActive}
              sx={{
                color: "#fff",
                backgroundColor: isActive ? "#333" : "transparent",
                "&:hover": {
                  backgroundColor: "#444", // hover color
                },
                "&.Mui-selected": {
                  backgroundColor: "#333",
                  "&:hover": {
                    backgroundColor: "#444",
                  },
                },
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
