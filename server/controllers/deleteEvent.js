const eventModel = require("../models/eventModel");
const fs = require("fs").promises;

const deleteEventController = async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(400).send({ error: "Event ID is required" });
    }

    const deletedEvent = await eventModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).send({ error: "Event not found" });
    }

    res.status(200).send({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting event",
      error,
    });
  }
};

module.exports = deleteEventController;
