const express = require("express");
const router = express.Router();
const {
  generateOtp,

} = require("../controllers/authWithOtpController");

router.post("/generate-otp", generateOtp);


module.exports = router;
