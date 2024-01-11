import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";

const EditEventForm = ({ editedEvent, onClose }) => {
  const [editableEvent, setEditableEvent] = useState(editedEvent);
  const [eventImage, setEventImage] = useState(null);
  const [eventPoster, setEventPoster] = useState(null);

  useEffect(() => {
    setEditableEvent(editedEvent);
  }, [editedEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (e.target.name === "eventImage") {
        setEventImage(file);
      } else if (e.target.name === "eventPoster") {
        setEventPoster(file);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      for (const key in editableEvent) {
        formData.append(key, editableEvent[key]);
      }

      if (eventImage) {
        formData.append("eventImage", eventImage);
      }

      if (eventPoster) {
        formData.append("eventPoster", eventPoster);
      }

      await axios.put(
        `http://localhost:3000/update/${editedEvent._id}`,
        formData
      );
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!editableEvent) {
    return <div>Loading...</div>;
  }

  return (
    <form>
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        name="title"
        value={editableEvent.title}
        onChange={handleInputChange}
      />
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        name="description"
        value={editableEvent.description}
        onChange={handleInputChange}
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={editableEvent.email}
        onChange={handleInputChange}
      />
      <TextField
        id="address"
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        name="address"
        value={editableEvent.address}
        onChange={handleInputChange}
      />
      <TextField
        id="city"
        label="City"
        variant="outlined"
        fullWidth
        margin="normal"
        name="city"
        value={editableEvent.city}
        onChange={handleInputChange}
      />
      <TextField
        id="organizerDetails"
        label="Organizer Details"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        name="organizerDetails"
        value={editableEvent.organizerDetails}
        onChange={handleInputChange}
      />
      <Box mt={2}>
        <Typography variant="subtitle1">Current Event Image:</Typography>
        {editableEvent.eventImage && (
          <Paper>
            <img
              src={`http://localhost:3000/uploads/${editableEvent.eventImage}`}
              alt="Event Image"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </Paper>
        )}
      </Box>
      <input type="file" name="eventImage" onChange={handleImageChange} />
      <Box mt={2}>
        <Typography variant="subtitle1">Current Event Poster:</Typography>
        {editableEvent.eventPoster && (
          <Paper>
            <img
              src={`http://localhost:3000/uploads/${editableEvent.eventPoster}`}
              alt="Event Poster"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </Paper>
        )}
      </Box>
      <input type="file" name="eventPoster" onChange={handleImageChange} />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Event
      </Button>
    </form>
  );
};

export default EditEventForm;
