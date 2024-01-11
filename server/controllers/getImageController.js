const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongoose').Types;
const Events = require('../models/eventModel');

const uploadPath = './uploads';

const getImage = async (req, res) => {
  const eventId = req.params.eventId;

  if (!ObjectId.isValid(eventId)) {
    return res.status(400).json({ success: false, message: 'Invalid eventId' });
  }

  try {
    const event = await Events.findById(eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const imagePath = path.join(uploadPath, `eventImage-${event.eventImage}`);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ success: false, message: 'Image not found for the event' });
    }

    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { getImage };
