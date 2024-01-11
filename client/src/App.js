import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import UserDashboard from './components/Dashboard/UserDashboard'
import ForgetPassword from './components/ForgetPage/ForgetPassword'
import OtpPage from "./components/ForgetPage/OtpPage";
import NewPasswordPage from "./components/ForgetPage/NewPassword";

import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/createNew" element={<NewPasswordPage/>} />
     
      </Routes>
    </Router>
  );
};

export default App;
