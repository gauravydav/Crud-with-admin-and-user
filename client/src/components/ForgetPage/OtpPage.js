import React from "react";
import { Typography, TextField, Button, Box, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

const OTPPage = ({ onSubmitOTP }) => {
  const navigate = useNavigate();

  const handleBackToSignIn = () => {
    navigate("/");
  };

  const handleSubmitOTP = (e) => {
    e.preventDefault();
    const otpInput = e.target.elements["otp"].value;

    if (otpInput && otpInput.length === 6 && /^\d+$/.test(otpInput)) {
      localStorage.setItem("otp", otpInput);

      navigate("/createNew");
    } else {
      alert("Invalid OTP. Please enter a 6-digit numeric OTP.");
    }
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
            Enter OTP
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "1rem" }}>
            Enter the OTP
          </Typography>
          <form onSubmit={handleSubmitOTP}>
            <TextField
              name="otp"
              label="OTP"
              type="text"
              fullWidth
              margin="normal"
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
              Submit Now
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
