import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Button,
  Link,
  Collapse,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false); // État pour afficher ou masquer l'alerte
  const [alertMessage, setAlertMessage] = useState(""); // Message de l'alerte

  useEffect(() => {
    validateToken();
  }, []);

  async function validateToken() {
    const user = JSON.parse(localStorage.getItem("user-info"));
    if (user != null) {
      const tokenIssuedAt =
        Math.floor(Date.now() / 1000) - (3600 - user.expires_in); // Approximate iat calculation
      const tokenExpiryTime = tokenIssuedAt + user.expires_in;
      const currentTime = Math.round(Date.now() / 1000);

      if (currentTime > tokenExpiryTime) {
        localStorage.removeItem("user-info");
        alert("Session expired. Please log in again.");
      } else {
        window.location.replace("/");
      }
    }
  }

  async function login() {
    const item = { email, password };

    try {
      const response = await fetch("http://localhost:8000/api/learning/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(item)
      });

      if (!response.ok) {
        throw await response.json();
      }

      const data = await response.json();
      localStorage.setItem("user-info", JSON.stringify(data));

      // Définir le message de l'alerte et l'afficher
      setAlertMessage("Connexion réussie ! Redirection en cours...");
      setOpen(true);

      // Redirection après un délai
      setTimeout(() => {
        window.location.replace("/");
      }, 3000);
    } catch (err) {
      // Afficher un message d'erreur
      setAlertMessage(err.message || "Une erreur est survenue.");
      setOpen(true);
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <div className="container">
      <h1>Welcome Back</h1>

      {/* Alerte avec MUI */}
      <Collapse in={open}>
        <Alert
          severity={alertMessage.includes("réussie") ? "success" : "error"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          /* sx={{ mb: 2 }} */
          sx={{
            position: "fixed",
            top: "95%",
            left: "0%",
            transform: "translate(1%, -50%)",
            zIndex: 10
          }}
        >
          {alertMessage}
        </Alert>
      </Collapse>

      <form className="form-control">
        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
          <label htmlFor="email">Email*</label>
          <OutlinedInput
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            label="Email"
          />
        </FormControl>
        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
          <label htmlFor="password">Password*</label>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="inherit" />
                  ) : (
                    <Visibility fontSize="inherit" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControlLabel
            control={
              <Checkbox
                name="tandc"
                value="true"
                color="primary"
                sx={{ padding: 0.5, "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            slotProps={{
              typography: {
                fontSize: 14
              }
            }}
            label="I agree with the T&C"
          />
          <Link href="/" variant="body2">
            Forgot password?
          </Link>
        </Box>
        <Button
          type="button"
          variant="outlined"
          color="info"
          size="small"
          disableElevation
          fullWidth
          sx={{ my: 2 }}
          onClick={login}
        >
          Login
        </Button>
      </form>
      <Box sx={{ textAlign: "center" }}>
        <Link href="/signup" variant="body2">
          Sign up
        </Link>
      </Box>
    </div>
  );
};

export default Login;
