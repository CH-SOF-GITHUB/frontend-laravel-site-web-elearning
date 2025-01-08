import React, { useEffect, useState } from "react";
import "../../../css/creator/MyCourses.css";

import {
  Container,
  Typography,
  //Card,
  //CardMedia,
  //Box,
  //Chip
} from "@mui/material";
//import InfoRounded from "@mui/icons-material/InfoRounded";
//import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  //fetchEnrolledCourses,
  fetchEnrolledCoursesByUser
} from "../../../services/coursesservice";
//import Checkout from "./Checkout";
import IntroDivider from "./IntroDivider";

const MyCourses = () => {
  const [enrolls, setEnrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolls = async () => {
    try {
      const response = await fetchEnrolledCoursesByUser();
      //const response = await fetchEnrolledCourses();
      setEnrolls(response.data.enrollments);
    } catch (error) {
      console.error("Erreur lors de la récupération des enrolls :", error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user-info"));

  const validateToken = async () => {
    if (user) {
      const tokenIssuedAt =
        Math.floor(Date.now() / 1000) - (3600 - user.expires_in);
      const tokenExpiryTime = tokenIssuedAt + user.expires_in;
      const currentTime = Math.round(Date.now() / 1000);

      if (currentTime > tokenExpiryTime) {
        localStorage.removeItem("user-info");
        alert("Session expired. Please log in again.");
        window.location.replace("/login");
        setLoading(true);
      } else {
        await fetchEnrolls();
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
    >
      <Typography variant="h4" gutterBottom align="center">
          vous êtes inscrit au ces cours !
      </Typography>
      {enrolls.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center">
          You have not enrolled in any courses yet.
        </Typography>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          {enrolls.map((enroll) => (
            <IntroDivider enroll={enroll} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default MyCourses;
