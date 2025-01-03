import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  LinearProgress,
  Alert,
  IconButton,
  Avatar,
  Paper,
  Divider
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FiSettings,
  FiBell,
  FiSliders,
  FiEdit2,
  FiSave,
  FiUser
} from "react-icons/fi";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
}));

const ProgressSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2)
}));
function MyAccount(props) {
  var user = JSON.parse(localStorage.getItem("user-info"));
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: `${user.user.name}`,
    email: `${user.user.email}`,
    phone: "+1 234 567 8900",
    address: "123 Main Street, New York, NY 10001"
  });

  const [progress, setProgress] = useState({
    profileCompletion: 75,
    goalsAchieved: 60,
    taskCompletion: 85
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!userData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setIsEditing(false);
    setError("");
  };

  const handleChange = (field) => (event) => {
    setUserData({
      ...userData,
      [field]: event.target.value
    });
  };

  function validateToken() {
    if (user != null) {
      // Get current timestamp
      const current = Math.round(Date.now() / 1000);

      // Calculate token expiration based on 'expires_in' value
      const tokenIssuedAt =
        Math.floor(Date.now() / 1000) - (3600 - user.expires_in);
      const tokenExpiryTime = tokenIssuedAt + user.expires_in;

      // Check if token has expired
      if (current > tokenExpiryTime) {
        localStorage.removeItem("user-info");
        window.location.replace("/login");
      }
    } else {
      window.location.replace("/login");
    }
  }

  //
  useEffect(() => {
    validateToken();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar sx={{ width: 80, height: 80, mr: 2 }} src="https://avatars.githubusercontent.com/u/19550456">
              </Avatar>
              
              <Typography variant="h5" component="div">
                Account Overview
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              {isEditing ? (
                <IconButton onClick={handleSave} color="primary">
                  <FiSave />
                </IconButton>
              ) : (
                <IconButton onClick={handleEdit} color="primary">
                  <FiEdit2 />
                </IconButton>
              )}
            </Box>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Grid container spacing={2}>
              {Object.entries(userData).map(([field, value]) => (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={value}
                    onChange={handleChange(field)}
                    disabled={!isEditing}
                    variant="outlined"
                    required={field === "email"}
                  />
                </Grid>
              ))}
            </Grid>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Quick Access
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FiSettings />}
                  sx={{ p: 2 }}
                >
                  Account Settings
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FiSliders />}
                  sx={{ p: 2 }}
                >
                  Preferences
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FiBell />}
                  sx={{ p: 2 }}
                >
                  Notifications
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <ProgressSection>
              <Typography variant="h6" gutterBottom>
                Progress Overview
              </Typography>
              <Grid container spacing={3}>
                {Object.entries(progress).map(([key, value]) => (
                  <Grid item xs={12} key={key}>
                    <Typography variant="body2" gutterBottom>
                      {key.split(/(?=[A-Z])/).join(" ")}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={value}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {value}% Complete
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </ProgressSection>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyAccount;
