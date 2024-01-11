const multer = require('multer');
const path = require('path');
const fs = require('fs');
const eventModel = require('../models/eventModel');

const uploadPath = './uploads';

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'eventImage', maxCount: 1 },
  { name: 'eventPoster', maxCount: 1 },
]);

const editEvent = async (req, res) => {
  try {
  
    console.log('Called');
    console.log(req.body); 
    console.log(req.files); 

    const eventId = req.params.id;
    const { title, description, email, phone, address, city, organizerDetails, displayStatus } = req.body;
    console.log(req.body);
    console.log(req.files);

    if (!title || !description || !email || !phone || !address || !city || !organizerDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updatedEvent = {
      title,
      description,
      email,
      phone,
      address,
      city,
      organizerDetails,
      displayStatus: displayStatus === 'public',
    };

    if (req.files && req.files.eventImage) {
      const eventImageFilename = req.files.eventImage[0].filename;
      updatedEvent.eventImage = eventImageFilename;
    }

    if (req.files && req.files.eventPoster) {
      const eventPosterFilename = req.files.eventPoster[0].filename;
      updatedEvent.eventPoster = eventPosterFilename;
    }

    const result = await eventModel.findByIdAndUpdate(eventId, updatedEvent, { new: true });
    console.log(result);

    if (!result) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully', updatedEvent: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { editEvent, upload };
