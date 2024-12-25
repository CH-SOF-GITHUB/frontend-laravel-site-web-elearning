import React, { useEffect, useState } from "react";
import "../../../css/creator/MyCourses.css";

import {
  Container,
  Typography,
  Card,
  CardMedia,
  Box,
  Chip,
  Button,
  Tooltip
} from "@mui/material";
import InfoRounded from "@mui/icons-material/InfoRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { fetchEnrolledCourses } from "../../../services/coursesservice";

const MyCourses = () => {
  const [enrolls, setEnrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolls = async () => {
    try {
      const response = await fetchEnrolledCourses();
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
        My Courses
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
            gap: "16px", // Space between cards
            justifyContent: "space-between"
          }}
        >
          {enrolls.map((enroll) => (
            <Card
              variant="outlined"
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                zIndex: 1,
                width: { xs: "100%", sm: "calc(33.333% - 16px)" }
              }}
              key={enroll.id}
            >
              <CardMedia
                component="img"
                width="100"
                height="100"
                alt={`${enroll.formation.title} cover`}
                src={enroll.formation.photo || "/images/default-course.png"}
                sx={{
                  borderRadius: "6px",
                  width: { xs: "100%", sm: 100 }
                }}
              />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography
                  gutterBottom
                  sx={{
                    whiteSpace: "normal", // Allow text to wrap
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: 12
                  }}
                >
                  {enroll.formation.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, fontWeight: "bold", fontSize: "20px" }}
                >
                  €{enroll.formation.price}
                </Typography>
                <Chip
                  size="small"
                  variant="outlined"
                  icon={<InfoRounded />}
                  label={enroll.status === "draft" ? "Brouillon" : "Validé"}
                  sx={{
                    fontSize: 16,
                    color: "orange", // Text color is orange
                    borderColor: "orange", // Border color is also orange
                    borderRadius: "16px", // Border radius for Chip
                    ".MuiChip-icon": { fontSize: 16, color: "orange" }, // Icon color is orange
                    marginRight: "10px" // Adds space between the Chip and the Button
                  }}
                />
                {/* Start Date Section with Chip */}
                <Chip
                  icon={<CalendarTodayIcon />}
                  label={`Start Date: ${enroll.start_date ? new Date(enroll.start_date).toLocaleDateString() : "Indisponible"}`}
                  sx={{
                    marginTop: 1,
                    fontSize: 14,
                    borderRadius: "16px", // Adding border radius
                    backgroundColor: "#f0f0f0", // Light background for the chip
                    borderColor: "#00796b", // Teal border color
                    color: "#00796b", // Teal text color
                    padding: "4px 8px" // Padding to make it look nice
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{
                    borderRadius: "15px",
                    fontSize: "10px",
                    marginTop: "8px"
                  }}
                  onClick={() => alert("Proceed to Payment")}
                >
                  Pay Now
                </Button>
              </Box>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default MyCourses;
