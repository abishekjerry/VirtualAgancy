import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Avatar,
  Typography,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import { Language } from "@mui/icons-material";
import { Labels } from "../../utils/constants/labels";
import { useNavigate } from "react-router-dom";
import Logo from "../../utils/assets/Navbar/Logo.svg";
import { labelRoutes } from "../../navigations/labelRoutes";
import PTypography from "../PTypography/PTypography";
import { FaBars } from "react-icons/fa";
import { FontWeight } from "../../utils/constants/fonts";
import { CommonColors } from "../../utils/constants/colors";
const PNavbar = ({
  name = "User",
  email = "",
  avatar = "",
  notificationCount = 0,
  title = "",
  toggleSidebar
}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate(labelRoutes.home, { replace: true }); // redirect login page
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: "0px solid #f1f5f9",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          position: "relative",
          minHeight: 50
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={toggleSidebar}>
            <FaBars size={20} />
          </IconButton>

          <Box className="mt-1">
            <img src={Logo} alt="Logo" style={{ height: 35 }} />
          </Box>
        </Box>

        {/* Center Section */}

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            margin:"3px"
          }}
        >
          <PTypography
            labelText= { title == "" ? "" : title !== "Dashboard" ? `${title} - ${Labels.dashboard.agencyPortal}` : Labels.dashboard.agencyPortal }
            flag={Labels.fontFlags.subHeader}
            color={CommonColors.red.main}
            weight={FontWeight.bold}
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          />
        </Box>


        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Language */}
          <IconButton
            sx={{
              border: "1px solid #e2e8f0",
              color: "#64748b",
              "&:hover": { bgcolor: "#f8fafc" }
            }}
          >
            <Language fontSize="small" />
          </IconButton>

          {/* Notification */}
          <IconButton
            sx={{
              border: "1px solid #e2e8f0",
              color: "#64748b",
              "&:hover": { bgcolor: "#f8fafc" }
            }}
          >
            <Badge
              badgeContent={notificationCount}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#e30613",
                  color: "#fff"
                }
              }}
            >
              <NotificationsNoneIcon fontSize="small" />
            </Badge>
          </IconButton>

          {/* Profile */}
          <Paper
            onClick={handleOpen}
            onMouseEnter={handleOpen}
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              pl: 0.5,
              pr: 2,
              py: 0.5,
              borderRadius: "50px",
              border: "1px solid #e2e8f0",
              cursor: "pointer",
              "&:hover": { bgcolor: "#f8fafc" }
            }}
          >
            <Avatar
              alt={name}
              src={avatar || ""}
              sx={{ width: 32, height: 32 }}
            >
              {!avatar && name ? name.charAt(0).toUpperCase() : ""}
            </Avatar>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {name}
              </Typography>

              <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                {email}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Toolbar>

      {/* Popup Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        PaperProps={{
          sx: {
            mt: 1.5
          }
        }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>


  );
};

export default PNavbar;



