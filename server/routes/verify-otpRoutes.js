const express = require("express");
const router = express.Router();
const {
  verifyOtpAndUpdatePassword,
} = require("../controllers/authWithOtpController");


router.post("/verify-otp", verifyOtpAndUpdatePassword);

module.exports = router;
