import React, { useEffect, useState } from "react";
import "../../../css/creator/MyCourses.css";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions
} from "@mui/material";
import { fetchEnrolledCourses } from "../../../services/coursesservice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MyCourses = () => {
  const [enrolls, setEnrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolls = async () => {
    try {
      const response = await fetchEnrolledCourses();
      setEnrolls(response.data.enrollments);
      console.log("Enrolls: ", enrolls);
    } catch (error) {
      console.error("Erreur lors de la récupération des enrolls :", error);
    }
  };
  // validate token
  const user = JSON.parse(localStorage.getItem("user-info"));

  const validateToken = async () => {
    if (user) {
      // Extract the token creation timestamp and expiration time
      const tokenIssuedAt =
        Math.floor(Date.now() / 1000) - (3600 - user.expires_in); // Approximate iat calculation
      const tokenExpiryTime = tokenIssuedAt + user.expires_in;
      const currentTime = Math.round(Date.now() / 1000);

      if (currentTime > tokenExpiryTime) {
        localStorage.removeItem("user-info");
        alert("Session expired. Please log in again.");
        window.location.replace("/login"); // Redirect to login page
        setLoading(true);
      } else {
        // Token is valid, proceed to load courses
        await fetchEnrolls();
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  useEffect(() => {
    fetchEnrolls();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom align="center">
        My Courses
      </Typography>
      {enrolls.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center">
          You have not enrolled in any courses yet.
        </Typography>
      ) : (
        <div container spacing={3}>
          {enrolls.map((enroll) => (
            <div
              item
              xs={12}
              sm={6}
              md={4}
              style={{ marginTop: "10px", marginBottom: "30px" }}
              key={enroll.id}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6">{enroll.formation.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {enroll.formation.description}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Price: ${enroll.formation.price}
                  </Typography>
                </CardContent>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    <Typography component="span">Payment Actions</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography component="p">
                      Veuillez confirmer vos actions de paiement ci-dessous.
                      Vous pouvez soit annuler l'opération si nécessaire, soit
                      valider le paiement pour poursuivre le processus.
                    </Typography>
                  </AccordionDetails>
                  <AccordionActions>
                    <Button color="secondary">Cancel</Button>
                    <Button color="primary" variant="contained">
                      Agree
                    </Button>
                  </AccordionActions>
                </Accordion>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default MyCourses;
