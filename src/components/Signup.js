import React, { useState } from "react";
//import { Button } from "./Button";
import "../css/Signup.css";
import { Alert, Button, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  //const [loading, setLoading] = useState(false); // State to track loading
  const [open, setOpen] = useState(false); // État pour afficher ou masquer l'alerte
  const [alertMessage, setAlertMessage] = useState(""); // Message de l'alerte

  // function signup()
  async function signup() {
    // Validation côté client
    if (!name || !email || !password || !confirmpassword) {
      setAlertMessage("Veuillez remplir tous les champs obligatoires.");
      setOpen(true);
      return;
    }

    if (password !== confirmpassword) {
      setAlertMessage("Les mots de passe ne correspondent pas.");
      setOpen(true);
      return;
    }

    const item = {
      name,
      email,
      password,
      password_confirmation: confirmpassword
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/learning/register",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(item)
        }
      );

      if (!response.ok) {
        //const errorData = await response.json();
        const rawResponse = await response.json();
        const errorData = JSON.parse(rawResponse);

        // Vérifiez si l'erreur concerne l'email
        if (errorData && errorData.email && Array.isArray(errorData.email)) {
          const emailErrorMessage = errorData.email[0]; // Récupère le premier message
          setAlertMessage("L'email est déjà existe !");
          setOpen(true);
          return;
        }
      }

      // Succès de l'inscription
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("register", JSON.stringify(data));

        setAlertMessage("Inscription réussie ! Redirection en cours...");
        setOpen(true);

        setTimeout(() => {
          window.location.replace("/login");
        }, 3000);
      }
    } catch (err) {
      // Gestion des erreurs réseau ou inattendues
      setAlertMessage(err.message || "Une erreur est survenue.");
      setOpen(true);
    }
  }

  return (
    <>
      <div className="container">
        {/* Alerte avec MUI */}
        <Collapse in={open}>
          <Alert
            severity={
              alertMessage.includes("succès") ||
              alertMessage.includes("réussie")
                ? "success"
                : "error"
            }
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
            sx={{
              position: "fixed",
              top: "59%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10
            }}
          >
            {alertMessage}
          </Alert>
        </Collapse>
        <h1>Lets Get Started</h1>
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
        <form className="form-control">
          <div>
            <label htmlFor="username">Name*</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={(e) => setName(e.target.value)}
              id="name"
            />
          </div>
          <div>
            <label htmlFor="email">Email*</label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <div>
            <label htmlFor="confirmpassword">Password Confirmation*</label>
            <input
              type="password"
              className="form-control"
              name="confirmpassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmpassword"
            />
          </div>
          {/* <Button
            onClick={signup}
            className="btn"
            type="button"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </Button> */}
          <Button
            type="button"
            variant="outlined"
            color="info"
            size="small"
            disableElevation
            fullWidth
            sx={{ my: 2 }}
            onClick={signup}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
};

export default Signup;
