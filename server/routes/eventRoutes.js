const express = require('express');
const { saveEvent, upload } = require('../controllers/createEvent');

const router = express.Router();


router.post('/save_event', upload, saveEvent);

 

module.exports = router;
