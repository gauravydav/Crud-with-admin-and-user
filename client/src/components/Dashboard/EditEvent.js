import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GetEventById = () => {
  const [event, setEvent] = useState(null);
  const [editableEvent, setEditableEvent] = useState(null);
  const [eventImage, setEventImage] = useState(null);
  const [eventPoster, setEventPoster] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/${id}`);
        setEvent(response.data);
        setEditableEvent(response.data);
      } catch (error) {
        console.error('Error fetching event by ID:', error);
      }
    };

    fetchEventById();
  }, [id]);

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
      if (e.target.name === 'eventImage') {
        setEventImage(file);
      } else if (e.target.name === 'eventPoster') {
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

    formData.append('eventImage', eventImage);
    formData.append('eventPoster', eventPoster);

    await axios.put(`http://localhost:3000/update/${id}`, formData);

    setEvent(editableEvent);

    navigate('/user-dashboard');
  } catch (error) {
    console.error('Error updating event:', error);
  }
};




  return (
    <div>
      <h1>Event Details</h1>
      {event ? (
        <div>
          <h2>Current Event Details</h2>
          <ul>
            {Object.keys(event).map((key) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {event[key]}
              </li>
            ))}
          </ul>

          {/* Editable form */}
          <h2>Edit Event</h2>
          <form encType="multipart/form-data">
            {Object.keys(editableEvent || {}).map((key) => (
              <div key={key}>
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={editableEvent[key] || ''}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <div>
              <label htmlFor="eventImage">Event Image:</label>
              <input type="file" id="eventImage" name="eventImage" onChange={handleImageChange} />
            </div>

            <div>
              <label htmlFor="eventPoster">Event Poster:</label>
              <input type="file" id="eventPoster" name="eventPoster" onChange={handleImageChange} />
            </div>

            <button type="button" onClick={handleUpdate}>
              Update Event
            </button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetEventById;
