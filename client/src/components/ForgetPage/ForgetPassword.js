import React, { useState } from "react";
import { Typography, TextField, Button, Box, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTPPage = ({ onBackToSignIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem("email", email);
      const response = await axios.post(
        "http://localhost:3000/generate-otp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("OTP generated successfully:", response.data);

      navigate("/otp");
    } catch (error) {
      console.error("Error generating OTP:", error.message);
    }
  };

  const handleBackToSignIn = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
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
          <Typography
            variant="h6"
            style={{ margin: "0.5rem 0", color: "#0f2761", fontWeight: "600" }}
          >
            Forgot Password?
          </Typography>
          <Typography variant="h8" style={{ marginBottom: "1rem" }}>
            No worries, we'll send you reset instructions.
          </Typography>
          <form onSubmit={handleResetPassword}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default OTPPage;
