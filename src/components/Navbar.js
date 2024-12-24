import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Container
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import BlogIcon from "@mui/icons-material/RssFeed";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchAppBar from "./Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isloginned, setLoginStatus] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const checkLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user-info"));
    if (storedUser) {
      const current = Math.round(Date.now() / 1000);
      const tokenIssuedAt =
        Math.floor(Date.now() / 1000) - (3600 - storedUser.expires_in);
      const tokenExpiryTime = tokenIssuedAt + storedUser.expires_in;

      if (current > tokenExpiryTime) {
        setLoginStatus(false);
        localStorage.removeItem("user-info");
        setUser(null);
      } else {
        setLoginStatus(true);
        setUser(storedUser);
      }
    } else {
      setLoginStatus(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleProtectedRoute = (event, path) => {
    event.preventDefault() // Empêche la navigation par défaut
    if (!isloginned) {
      toast.error('Vous devez être connecté pour accéder à cette page !', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true
      })
    } else {
      navigate(path)
    }
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl"> {/* Utilisation de container-fluid */}
          <Toolbar sx={{ justifyContent: "space-between", minWidth: "100%" }}>
            {/* Conteneur pour le logo et les icônes de navigation */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  LetsProgramify
                </Link>
              </Typography>
              <IconButton color="inherit" component={Link} to="/" sx={{fontSize:"15px"}}>
                <HomeIcon /> Home
              </IconButton>
              {/* Lien vers Courses */}
              <IconButton color="inherit" component={Link} onClick={event => handleProtectedRoute(event, '/courses')} sx={{fontSize:"15px"}}>
                <BookIcon /> All Courses
              </IconButton>
              <IconButton color="inherit" component={Link} to="/blog" sx={{fontSize:"15px"}}>
                <BlogIcon /> Blog
              </IconButton>
            </Box>
            {/* Espace pour les autres éléments */}
            <Box sx={{ flexGrow: 1 }} />
            {isloginned ? (
              <div style={{marginRight:"10px"}}>
                <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  PaperProps={{
                    style: {
                      maxHeight: "300px", // Limite la hauteur du menu
                      width: "200px" // Ajustez si nécessaire
                    }
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/instructor/dashboard");
                    }}
                  >
                    Student Infos
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/student/mycourses");
                    }}
                  >
                    My Courses
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/myaccount");
                    }}
                  >
                    My Account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/logout");
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Box>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ marginRight: 1 }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  to="/signup"
                >
                  Signup
                </Button>
              </Box>
            )}
            {/* Barre de recherche, notifications, login/logout */}
            <SearchAppBar />
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <ToastContainer />
    </>
  );
}

export default Navbar;