const express = require('express');
const router = express.Router();
const { getImage } = require('../controllers/getImageController'); 

router.get('/image/:eventId', getImage);

module.exports = router;
