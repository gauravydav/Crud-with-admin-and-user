const express = require('express');
const router = express.Router();
const getAllEventsController = require('../controllers/getAllEventsController');

router.get('/events', getAllEventsController);

module.exports = router;
