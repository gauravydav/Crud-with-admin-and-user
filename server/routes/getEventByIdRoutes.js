
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/getEventByIdContoller'); 


router.get('/events/:eventId', eventController.getEventById);

module.exports = router;
