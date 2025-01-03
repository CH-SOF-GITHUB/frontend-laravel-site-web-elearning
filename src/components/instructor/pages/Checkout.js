import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const Checkout = ({ enroll }) => {
  const stripePromise = loadStripe("pk_test_51PiifPRoqDn8rDS1jxYjqCV5SgTkXSNv52Ni5PqCria3V6ZvQjAGW4cY5FklCUwKJtcp4B4Meu7LHK5qmgkzRRXa00InlgSaYo");

  const [isTokenValid, setIsTokenValid] = useState(false);
  const user = JSON.parse(localStorage.getItem("user-info"));

  // Fonction pour valider le token
  const validateToken = () => {
    if (user) {
      const tokenIssuedAt =
        Math.floor(Date.now() / 1000) - (3600 - user.expires_in);
      const tokenExpiryTime = tokenIssuedAt + user.expires_in;
      const currentTime = Math.round(Date.now() / 1000);

      if (currentTime > tokenExpiryTime) {
        localStorage.removeItem("user-info");
        alert("Session expirée. Veuillez vous reconnecter.");
        window.location.replace("/login");
        return false;
      }
      return true;
    }
    return false;
  };

  useEffect(() => {
    const tokenIsValid = validateToken();
    setIsTokenValid(tokenIsValid);
  }, []); // S'exécute une fois lors du chargement

  // Fonction de paiement
  const handlePayment = async () => {
    if (!isTokenValid) {
      alert("Token invalide ou expiré. Veuillez vous reconnecter.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/learning/create-checkout-session",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access_token}` // Ajout du token dans les en-têtes
          },
          body: JSON.stringify({
            course_title: enroll.formation.title,
            price: enroll.formation.price
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la création de la session de paiement."
        );
      }

      const data = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error(
        "Erreur lors de la création de la session de paiement :",
        error
      );
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      style={{
        borderRadius: "15px",
        fontSize: "10px",
        marginTop: "8px"
      }}
      onClick={handlePayment}
      disabled={!isTokenValid} // Désactive le bouton si le token est invalide
    >
      Je Paye
    </Button>
  );
};

export default Checkout;
