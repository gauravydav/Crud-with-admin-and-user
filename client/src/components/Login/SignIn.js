import React, { useState } from "react";
import { Button, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 

const SignInForm = () => {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handlePasswordVisibility = () => {
    setSignInData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post("http://localhost:3000/login/", {
        email: signInData.email,
        password: signInData.password,
      });

      const token = response.data.token;
      const decoded = jwtDecode(token);
// console.log(decoded)
//       console.log(decoded.user.role);
      if (decoded.user.isAdmin ===false) {
        navigate('/user-dashboard');
      } else {
        navigate('/admin-dashboard');
      }
      localStorage.setItem("jwtToken");
    } catch (error) {
      console.error('Login failed:', error);
     
    }
  };

  const handleForgetPasswordClick = (e) => {
    e.preventDefault();
    navigate("/forget-password");
  };

  return (
    <form onSubmit={handleSignInSubmit}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        name="email"
        value={signInData.email}
        onChange={handleInputChange}
      />
      <TextField
        label="Password"
        type={signInData.showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        name="password"
        value={signInData.password}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handlePasswordVisibility}>
                {signInData.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography component="div" style={{ textAlign: "right", marginTop: 1 }}>
        <a href="#" onClick={handleForgetPasswordClick}>
          Forget Password?
        </a>
      </Typography>
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
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
