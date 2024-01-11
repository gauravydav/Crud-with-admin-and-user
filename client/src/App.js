import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import UserDashboard from './components/Dashboard/UserDashboard'
import ForgetPassword from './components/ForgetPage/ForgetPassword'
import OtpPage from "./components/ForgetPage/OtpPage";
import NewPasswordPage from "./components/ForgetPage/NewPassword";
import CreateEventForm from './components/Dashboard/AddEvent';
import EventSearch from './components/Dashboard/EventSearch';
import EditEventPage from './components/Dashboard/EditEvent';
import AdminDashboard from "./components/Dashboard/AdminDashboard";

import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/createNew" element={<NewPasswordPage/>} />
        <Route path="/search" element={<EventSearch />} />
        {/* <Route path="/createvent" element={<CreateEventForm />} /> */}
        <Route path="/edit-event/:id" element={<EditEventPage/>} />
     
      </Routes>
    </Router>
  );
};

export default App;
