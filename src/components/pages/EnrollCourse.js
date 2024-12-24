import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  MenuItem
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchCourseById } from "../../services/coursesservice";
import { AccountCircle, LibraryBooks, AttachMoney } from "@mui/icons-material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { fetchLanguageMedium } from "../../services/languagemediumservice";
const EnrollCourse = () => {
  const { id } = useParams();
  // Data formations for Carousel
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [comment, setComment] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  // SNACKBAR for success/error messages
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    message: ""
  });
  // Form validation errors
  const [errors, setErrors] = useState({
    fullname: "",
    phone: "",
    email: "",
    course: "",
    price: "",
    isChecked: ""
  });

  // Fetching data from API
  // Récupération des données du cours
  const fetchCourseData = async () => {
    try {
      // Remplacez par votre API
      const response = await fetchCourseById(id);
      setCourse(response.data.course);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du cours :",
        error
      );
    }
  };

  // Récupération des données de languges du cour
  const fetchLanguageData = async () => {
    try {
      const response = await fetchLanguageMedium();
      console.log(response.data.languages); // Accédez à 'languages' au lieu de 'data'
      setLanguages(response.data.languages); // Mettez à jour l'état avec les langues
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de languges du cour :",
        error
      );
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
      } else {
        // Token is valid, proceed to load courses
        await fetchCourseData();
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  useEffect(() => {
    fetchLanguageData();
  }, []);

  // Debugging: Log comments whenever they change
  useEffect(() => {
    console.log("Loaded languages:", languages);
  }, [languages]);

  // Handle form submission
  const handleSubmit = (e) => {
    // Check if the form is submitted
    e.preventDefault();
    // Clear previous errors
    setErrors({
      fullname: "",
      phone: "",
      email: "",
      course: "",
      price: "",
      isChecked: ""
    });

    let newErrors = {};

    // Validate fields
    if (!fullname) {
      newErrors.fullname = "Full name is required";
    }
    if (!phone) {
      newErrors.phone = "Phone is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid";
    }
    if (!course) {
      newErrors.course = "Course selection is required";
    }
    if (!price) {
      newErrors.price = "Price selection is required";
    }

    if (!isChecked) {
      newErrors.isChecked = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);

    // If no errors, simulate API call and display success message
    if (Object.keys(newErrors).length === 0) {
      const enrollData = { fullname, phone, email, course, comment };
      console.log(enrollData);

      setSnackbar({
        open: true,
        type: "success",
        message: "You have successfully enrolled in the course!"
      });

      // Reset form
      setFullName("");
      setPhone("");
      setEmail("");
      setCourse("");
      setPrice("");
      setComment("");
      setIsChecked(false); // Reset checkbox
      /*
      fetch("http://localhost:8000/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          fullname,
          phone,
          email,
          formation_id: course,
          language_id: language,
          price,
          promo_code: promoCode,
          comment
        }),
      });
      */
    }
    /*else if (!firstname & !lastname & !email & !course & !isChecked) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Please fill all required fields correctly!"
      });
    }*/
  };

  // handle close Snackbar for success/error messages
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
          id="input-with-icon-textfield"
          label="Full name"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }
          }}
          variant="standard"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
          error={!!errors.fullname}
          helperText={errors.fullname}
        />
        {/* Telephone Field */}
        <TextField
          id="input-with-icon-textfield"
          label="Telephone"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <ContactPhoneIcon />
                </InputAdornment>
              )
            }
          }}
          variant="standard"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        {/* Email Field */}
        <TextField
          id="input-with-icon-textfield"
          label="Email"
          type="email"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              )
            }
          }}
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        {/* Course Selection */}
        <TextField
          disabled
          id="outlined-disabled"
          label="Course"
          value={course.title}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LibraryBooks />
                </InputAdornment>
              )
            }
          }}
        />

        {/* Price Field */}
        <TextField
          disabled
          id="outlined-disabled"
          label="Price"
          value={course.price}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              )
            }
          }}
        />
        {/* Language Field */}
        {languages.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            Loading languages...
          </Typography>
        ) : (
          <TextField
            select
            label="Choose the language option"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            variant="outlined"
          >
            {languages.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.language_name}
              </MenuItem>
            ))}
          </TextField>
        )}
        {/* Code promo Field */}
        <TextField
          id="input-with-icon-textfield"
          label="Promo Code (Optional)"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SubtitlesIcon />
                </InputAdornment>
              )
            }
          }}
          variant="standard"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        {/* Comment Field */}
        <TextField
          id="input-with-icon-textfield"
          label="Comments (Optional)"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <ChatBubbleOutlineIcon />
                </InputAdornment>
              )
            }
          }}
          variant="standard"
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
