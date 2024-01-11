const eventModel = require('../models/eventModel');

const searchEvents = async (req, res) => {
  try {
    console.log('called',req.query)
    const { title, city, date } = req.query;

    
    const query = {};
    if (title) query.title = new RegExp(title, 'i');
    if (city) query.city = new RegExp(city, 'i');
    if (date) query.date = { $gte: new Date(date) };
        console.log(query);
    const events = await eventModel.find(query);
    
    console.log(events);
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = searchEvents;
