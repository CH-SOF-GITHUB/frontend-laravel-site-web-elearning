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

  async function signup() {
    if (!name || !email || !password || !confirmpassword) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (password !== confirmpassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Reset error and enable loading
    setError("");
    //setLoading(true);

    let item = {
      name,
      email,
      password,
      password_confirmation: confirmpassword
    };

    try {
      let result = await fetch("http://localhost:8000/api/learning/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(item)
      });

      let response = await result.json();

      if (result.ok) {
        // alert("Vous avez été enregistré avec succès !");
        // Définir le message de l'alerte et l'afficher
        setAlertMessage(
          "Vous avez été enregistré avec succès ! Redirection en cours..."
        );
        setOpen(true);
        // Redirection après un délai
        setTimeout(() => {
          window.location.replace("/login");
        }, 3000);
      } else {
        setError(
          response.password
            ? response.password[0]
            : "Vous avez été enregistré avec échec !"
        );
        setAlertMessage(response.data);
        setOpen(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setError("Une erreur réseau est survenue. Veuillez réessayer plus tard.");
      setAlertMessage(error.message || "Une erreur est survenue.");
      setOpen(true);
    } finally {
      //setLoading(false); // Disable loading
    }
  }

  return (
    <>
      <div className="container">
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
