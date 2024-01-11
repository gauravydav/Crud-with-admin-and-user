import React, { useState } from 'react';
import axios from 'axios';

const EventSearch = () => {
  const [searchParams, setSearchParams] = useState({
    title: '',
    city: '',
    date: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      console.log(queryParams)
      const response = await axios.get(`http://localhost:3000/search${queryParams}`);
      
      if (response.status === 200) {
        setSearchResults(response.data.events);
        setError(null);
      } else {
        setSearchResults([]);
        setError(response.data?.error || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      setError('An error occurred');
    }
  };

  return (
    <div>
      <h1>Event Search</h1>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={searchParams.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={searchParams.city} onChange={handleInputChange} />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={searchParams.date} onChange={handleInputChange} />
      </div>
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {searchResults.map((event) => (
          <li key={event._id}>
            <strong>Title:</strong> {event.title}, {' '}
            <strong>City:</strong> {event.city}, {' '}
            <strong>Description:</strong> {event.description}, {' '}
            <strong>Email:</strong> {event.email}, {' '}
            <strong>Phone:</strong> {event.phone}, {' '}
            <strong>Address:</strong> {event.address}, {' '}
            <strong>Organizer:</strong> {event.organizerDetails}, {' '}
            <strong>Display Status:</strong> {event.displayStatus ? 'Active' : 'Inactive'}, {' '}
            <strong>Created At:</strong> {event.createdAt}, {' '}
            <strong>Updated At:</strong> {event.updatedAt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSearch;
