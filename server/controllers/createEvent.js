const multer = require("multer");
const path = require("path");
const fs = require("fs");
const eventModel = require("../models/eventModel");

const uploadPath = "./uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "eventImage", maxCount: 1 },
  { name: "eventPoster", maxCount: 1 },
]);

const saveEvent = async (req, res) => {
  try {
    console.log("called");
    const {
      title,
      description,
      email,
      phone,
      address,
      city,
      organizerDetails,
      displayStatus,
    } = req.body;

    if (
      !title ||
      !description ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !organizerDetails
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!req.files || !req.files.eventImage || !req.files.eventPoster) {
      return res
        .status(400)
        .json({ error: "EventImage and EventPoster files are required" });
    }

    const eventImageFilename = req.files.eventImage[0].filename;
    const eventPosterFilename = req.files.eventPoster[0].filename;

    const event = new eventModel({
      title,
      description,
      email,
      phone,
      address,
      city,
      organizerDetails,
      displayStatus: displayStatus === "public",
      eventImage: eventImageFilename,
      eventPoster: eventPosterFilename,
    });

    await event.save();

    res.json({ message: "Event saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { saveEvent, upload };
