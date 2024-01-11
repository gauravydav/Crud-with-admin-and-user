const express = require('express');
const deleteEventController = require('../controllers/deleteEvent');

const router = express.Router();

router.delete('/Edelete/:id', deleteEventController);

module.exports = router;
