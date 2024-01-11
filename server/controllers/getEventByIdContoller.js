const Event = require('../models/eventModel');

exports.getEventById = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const foundEvent = await Event.findById(eventId);

    if (!foundEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(foundEvent);
  } catch (error) {
    console.error('Error finding event by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
