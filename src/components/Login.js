import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import "../css/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import du CSS de react-toastify
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import  { Redirect } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { useHistory } from "react-router-dom"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //let history = useHistory();
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    validateToken();
  }, []);

  async function validateToken() {
    var user = JSON.parse(localStorage.getItem("user-info"));
    if (user != null) {
      // Extract the token creation timestamp and expiration time
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
    //console.warn(email, password);
    let item = { email, password };
    let result;
    fetch("http://localhost:8000/api/learning/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(item)
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        result = data;
        console.log(data);
        localStorage.setItem("user-info", JSON.stringify(data));
        // alert("Vous avez connecté avec succès !");
        toast.success("Vous avez connecté avec succès !", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true
        });
        setTimeout(() => {
          window.location.replace("/");
        }, 3000);
        // window.location.replace("/"); // Reload full page
        //history.push('/');
        //<Link to='/' className='login-link'></Link>   // will not reload full page just load the components on that path
      })
      .catch(async (err) => {
        let x = await err.json();
        console.log(x.message);
        toast.error(x.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true
        });
        // alert(x.message);
      });
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div class="container">
        <ToastContainer />
        <h1>Welcome Back</h1>
        <form action="" className="form-control">
          <div>
            <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
              <label htmlFor="email">Email*</label>
              <OutlinedInput
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
              />
            </FormControl>
          </div>

          <div>
            <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
              <label htmlFor="email">Password*</label>
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
          </div>

          <Button onClick={login} className="btn" type="button">
            Log In
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
