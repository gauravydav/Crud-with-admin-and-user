import React, { useState } from "react";
import { Container, Paper, Tabs, Box, Tab } from "@mui/material";
import Header from "../Header/Header";
import SignInForm from "../Login/SignIn";
import SignUpForm from "../Login/SignUp";
import "./HomePage.css"

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Submit");
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Submit");
  };

  const handlePasswordVisibility = () => {
    console.log("Toggle Password Visibility");
  };

  const handleConfirmPasswordVisibility = () => {
    console.log("Toggle Confirm Password Visibility");
  };

  const signInData = {
    email: "",
    password: "",
    showPassword: false,
  };

  const signUpData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  };

  return (
    <>
      <Header />

      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered
            textColor="white"
            sx={{ bgcolor: "background.paper", borderRadius: 3 }}
          >
            <Tab
              label="Sign In"
              sx={{
                color: (theme) =>
                  activeTab === 0
                    ? theme.palette.common.white
                    : theme.palette.primary.main,
                bgcolor: activeTab === 0 ? "#0f2761" : "transparent",
                borderRadius: 3,
              }}
            />
            <Tab
              label="Sign Up"
              sx={{
                color: (theme) =>
                  activeTab === 1
                    ? theme.palette.common.white
                    : theme.palette.primary.main,
                bgcolor: activeTab === 1 ? "#0f2761" : "transparent",
                borderRadius: 3,
              }}
            />
          </Tabs>

          <Box sx={{ marginTop: 2 }}>
            {activeTab === 0 ? (
              <SignInForm
                signInData={signInData}
                onSubmit={handleSignInSubmit}
                onPasswordVisibility={handlePasswordVisibility}
              />
            ) : (
              <SignUpForm
                signUpData={signUpData}
                onSubmit={handleSignUpSubmit}
                onPasswordVisibility={handlePasswordVisibility}
                onConfirmPasswordVisibility={handleConfirmPasswordVisibility}
              />
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default App;
