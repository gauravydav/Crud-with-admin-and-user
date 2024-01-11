const eventModel = require('../models/eventModel');

const getAllEventsController = async (req, res) => {
  try {
    const events = await eventModel.find();

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in getting events', error: error.message });
  }
};

module.exports = getAllEventsController;
