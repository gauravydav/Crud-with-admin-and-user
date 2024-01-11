import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyIcon from "@mui/icons-material/VpnKey";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [storedOtp, setStoredOtp] = useState("");
  const [storedEmail, setStoredEmail] = useState("");

  useEffect(() => {
    const otpFromLocalStorage = localStorage.getItem("otp");
    const emailFromLocalStorage = localStorage.getItem("email");

    if (otpFromLocalStorage && emailFromLocalStorage) {
      setStoredOtp(otpFromLocalStorage);
      setStoredEmail(emailFromLocalStorage);
    }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        const response = await fetch("http://localhost:3000/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: storedEmail,
            otp: storedOtp,
            newPassword,
          }),
        });

        if (response.ok) {
          console.log("Password reset successful");
          localStorage.removeItem("email");
          localStorage.removeItem("otp");
          navigate("/");
        } else {
          console.error("Password reset failed:", response.statusText);
          setPasswordError("Password reset failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during password reset:", error.message);
        setPasswordError("Password reset failed. Please try again.");
      }
    } else {
      setPasswordError("Passwords do not match");
    }
  };

  const handleBackToSignIn = () => {
    navigate("/");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Container component="div" maxWidth="xs">
        <Box
          sx={{
            backgroundColor: "white",
            padding: 3,
            borderRadius: 1,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <KeyIcon
            sx={{
              color: "#0f2761",
              fontSize: 30,
              borderRadius: "50%",
              backgroundColor: "#E0E0E0",
              padding: "15px",
            }}
          />
          <Typography
            variant="h6"
            style={{
              margin: "0.5rem 0",
              color: "#0f2761",
              fontWeight: "600",
            }}
          >
            Set New Password
          </Typography>
          <Typography
            variant="body1"
            style={{ color: "#0f2761", marginBottom: "1rem" }}
          >
            Your new password must be different
          </Typography>
          <form onSubmit={handleResetPassword}>
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                bgcolor: "#0f2761",
                borderRadius: 2,
                color: "white",
              }}
            >
              Reset Password
            </Button>
          </form>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
              color: "#0f2761",
              cursor: "pointer",
            }}
            onClick={handleBackToSignIn}
          >
            <ArrowBackIcon sx={{ marginRight: 1 }} />
            <Typography component="span">Back to Sign In</Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default NewPasswordPage;
