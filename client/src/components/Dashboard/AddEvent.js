import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';

function CreateEventForm({ openDrawer, onCloseDrawer }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    organizerDetails: '',
    displayStatus: false,
    eventImage: null,
    eventPoster: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    const updatedValue =
      type === 'file' ? e.target.files[0] : type === 'checkbox' ? e.target.checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'displayStatus' ? updatedValue === 'public' : updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post('http://localhost:3000/save_event', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Event saved successfully:', response.data);
      window.location.reload();
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: openDrawer ? 0 : '-30vw',
        width: '15vw',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        overflowY: 'auto',
        transition: 'right 0.5s',
        zIndex: 1100,
      }}
    >
      <div style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
        <h2>Create Event</h2>
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <TextareaAutosize
          rowsMin={3}
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          style={{ width: '100%', marginTop: '16px', marginBottom: '16px' }}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          margin="normal"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Organizer Details"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          name="organizerDetails"
          value={formData.organizerDetails}
          onChange={handleInputChange}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="displayStatus">Display Status</InputLabel>
          <Select
            label="Display Status"
            id="displayStatus"
            name="displayStatus"
            value={formData.displayStatus ? 'public' : 'private'}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="file"
          label="Event Image"
          variant="outlined"
          fullWidth
          margin="normal"
          name="eventImage"
          onChange={handleInputChange}
          accept="image/*"
        />
        <TextField
          type="file"
          label="Event Poster"
          variant="outlined"
          fullWidth
          margin="normal"
          name="eventPoster"
          onChange={handleInputChange}
          accept="image/*"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Save Event
        </Button>
      </form>
    </div>
  );
}

export default CreateEventForm;
