const express = require('express');
const { editEvent, upload } = require('../controllers/updateEvent');

const router = express.Router();


router.put('/update/:id',upload, editEvent);


module.exports = router;
