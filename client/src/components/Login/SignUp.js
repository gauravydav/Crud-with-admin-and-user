import React, { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [error, setError] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); 

  const [isRotating, setRotating] = useState(false);

  const handlePasswordVisibility = () => {
    setSignUpData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleConfirmPasswordVisibility = () => {
    setSignUpData((prevData) => ({
      ...prevData,
      showConfirmPassword: !prevData.showConfirmPassword,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (
      !signUpData.userName ||
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.confirmPassword ||
      !signUpData.role
    ) {
      setError("All fields are compulsory. Please fill in all the fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const formData = {
        username: signUpData.userName,
        email: signUpData.email,
        password: signUpData.password,
        confirmPassword: signUpData.confirmPassword,
        role: signUpData.role,
      };
      setRotating(true);
      const response = await axios.post(
        "http://localhost:3000/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setRotating(true);
      setTimeout(() => {
        setRotating(false);
        navigate("/");
        setSignUpData({
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          showPassword: false,
          showConfirmPassword: false,
        });
        setSnackbarMessage("Successfully signed up. Please sign in.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }, 3000);
    } catch (error) {
      console.error("Error during signup:", error.message);
      setError("Signup failed. Please try again.");
      setSnackbarMessage("Registration unsuccessful. " + error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);

      setRotating(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setSnackbarSeverity("success");
  };

  return (
    <>
      <form onSubmit={handleSignUpSubmit}>
        <TextField
          label="UserName"
          fullWidth
          margin="normal"
          name="userName"
          value={signUpData.userName}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          name="email"
          value={signUpData.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          type={signUpData.showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          name="password"
          value={signUpData.password}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility}>
                  {signUpData.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          type={signUpData.showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          name="confirmPassword"
          value={signUpData.confirmPassword}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleConfirmPasswordVisibility}>
                  {signUpData.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Fullname"
          fullWidth
          margin="normal"
          name="role"
          value={signUpData.role}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            bgcolor: "#0f2761",
            borderRadius: 20,
            color: "white",
          }}
        >
          {isRotating ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignUpForm;
