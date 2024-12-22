import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  MenuItem,
  Button,
  Box,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { useParams } from "react-router-dom";

const EnrollCourse = () => {
  const { id } = useParams();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [comment, setComment] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    message: ""
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    course: "",
    isChecked: ""
  });

  const courses = [
    { value: "react_basics", label: "React Basics" },
    { value: "advanced_js", label: "Advanced JavaScript" },
    { value: "web_dev_bootcamp", label: "Web Development Bootcamp" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({
      firstname: "",
      lastname: "",
      email: "",
      course: "",
      isChecked: ""
    });

    let newErrors = {};

    // Validate fields
    if (!firstname) {
      newErrors.firstname = "First name is required";
    }
    if (!lastname) {
      newErrors.lastname = "Last name is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid";
    }
    if (!course) {
      newErrors.course = "Course selection is required";
    }

    if (!isChecked) {
      newErrors.isChecked = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);

    // If no errors, simulate API call and display success message
    if (Object.keys(newErrors).length === 0) {
      const enrollData = { firstname, lastname, email, course, comment };
      console.log(enrollData);

      setSnackbar({
        open: true,
        type: "success",
        message: "You have successfully enrolled in the course!"
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setCourse("");
      setComment("");
      setIsChecked(false); // Reset checkbox
    }
    /*else if (!firstname & !lastname & !email & !course & !isChecked) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Please fill all required fields correctly!"
      });
    }*/
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom align="center">
        Enroll in a Course N° {id}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        {/* First Name Field */}
        <TextField
          label="First Name"
          variant="outlined"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          error={!!errors.firstname}
          helperText={errors.firstname}
        />
        {/* Last Name Field */}
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          error={!!errors.lastname}
          helperText={errors.lastname}
        />
        {/* Email Field */}
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        {/* Course Selection */}
        <TextField
          select
          label="Select a Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          variant="outlined"
          error={!!errors.course}
          helperText={errors.course}
        >
          {courses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/* Comment Field */}
        <TextField
          label="Comments (Optional)"
          variant="outlined"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {/* Terms and Conditions Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              error={!!errors.isChecked}
            />
          }
          label="I agree to the terms and conditions"
        />
        {errors.isChecked && (
          <Typography color="error" variant="caption">
            {errors.isChecked}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Enroll Now
        </Button>
      </Box>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EnrollCourse;
