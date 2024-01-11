import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  TablePagination,
  Drawer,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../Header/HeaderDashboard";
import CreateEventForm from "./AddEvent";
import CloseIcon from "@mui/icons-material/Close";
import EditEventDrawer from "./EditEventDrawer";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [titleSearchTerm, setTitleSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [dateSearchTerm, setDateSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewEvent, setViewEvent] = useState(null);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/events");
        setEvents(response.data.events);
        setFilteredEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTitleSearch = () => {
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(titleSearchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleCitySearch = () => {
    const filtered = events.filter((event) =>
      event.city.toLowerCase().includes(citySearchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleDateSearch = () => {
    const filtered = events.filter(
      (event) =>
        event.createdAt.includes(dateSearchTerm) ||
        event.updatedAt.includes(dateSearchTerm)
    );
    setFilteredEvents(filtered);
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = filteredEvents.find((event) => event._id === eventId);
    setEditedEvent(eventToEdit);
    setIsEditDrawerOpen(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      console.log(eventId);
      await axios.delete(`http://localhost:3000/Edelete/${eventId}`);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
      console.log(`Successfully deleted event with ID: ${eventId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const generateRowNumber = (index) => {
    return page * rowsPerPage + index + 1;
  };
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleViewEvent = (eventId) => {
    const selectedEvent = events.find((event) => event._id === eventId);
    setViewEvent(selectedEvent);
    setIsViewDrawerOpen(true);
  };

  const handleViewDrawerClose = () => {
    setIsViewDrawerOpen(false);
  };

  return (
    <div>
      <Header />

      <Card style={{ marginBottom: "16px", marginTop: "5rem" }}>
        <CardContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "8px" }}>
              <TextField
                id="titleSearch"
                placeholder="Search by Title"
                value={titleSearchTerm}
                onChange={(e) => setTitleSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTitleSearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div style={{ marginRight: "8px" }}>
              <TextField
                id="citySearch"
                placeholder="Search by City"
                value={citySearchTerm}
                onChange={(e) => setCitySearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCitySearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div style={{ marginRight: "8px" }}>
              <TextField
                id="dateSearch"
                placeholder="Search by Date (e.g., 2024-01-05)"
                value={dateSearchTerm}
                onChange={(e) => setDateSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleDateSearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Organizer</TableCell>
                  <TableCell>Event Banner</TableCell>
                  <TableCell>Event Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((event, index) => (
                    <TableRow key={event._id}>
                      <TableCell>{generateRowNumber(index)}</TableCell>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>{event.description}</TableCell>
                      <TableCell>{event.email}</TableCell>
                      <TableCell>{event.address}</TableCell>
                      <TableCell>{event.city}</TableCell>
                      <TableCell>{event.organizerDetails}</TableCell>
                      <TableCell>
                        {event.eventPoster && (
                          <img
                            src={`http://localhost:3000/uploads/${event.eventPoster}`}
                            alt="Poster"
                            loading="lazy"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {event.eventImage && (
                          <img
                            src={`http://localhost:3000/uploads/${event.eventImage}`}
                            alt="Event"
                            loading="lazy"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditEvent(event._id)}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          color="primary"
                          onClick={() => handleViewEvent(event._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>

                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteEvent(event._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredEvents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <Typography variant="body1">No events available</Typography>
      )}

      <Drawer
        anchor="right"
        open={isViewDrawerOpen}
        onClose={handleViewDrawerClose}
      >
        <div style={{ width: "300px", padding: "16px" }}>
          <Typography
            variant="h6"
            style={{ marginBottom: "24px", fontSize: "1.2rem" }}
          >
            View Event
          </Typography>
          {viewEvent && (
            <div>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: "8px" }}
              >{`Title: ${viewEvent.title}`}</Typography>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: "8px" }}
              >{`Description: ${viewEvent.description}`}</Typography>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: "8px" }}
              >{`Email: ${viewEvent.email}`}</Typography>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: "8px" }}
              >{`Address: ${viewEvent.address}`}</Typography>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: "8px" }}
              >{`City: ${viewEvent.city}`}</Typography>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: "8px" }}
              >{`Organizer: ${viewEvent.organizerDetails}`}</Typography>
              {viewEvent.eventPoster && (
                <div style={{ marginBottom: "16px" }}>
                  <Typography
                    variant="subtitle1"
                    style={{ marginBottom: "8px" }}
                  >
                    Event Banner:
                  </Typography>
                  <img
                    src={`http://localhost:3000/uploads/${viewEvent.eventPoster}`}
                    alt="Event Banner"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </div>
              )}
              {viewEvent.eventImage && (
                <div style={{ marginBottom: "16px" }}>
                  <Typography
                    variant="subtitle1"
                    style={{ marginBottom: "8px" }}
                  >
                    Event Image:
                  </Typography>
                  <img
                    src={`http://localhost:3000/uploads/${viewEvent.eventImage}`}
                    alt="Event Image"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>
          )}
          <IconButton
            color="primary"
            onClick={handleViewDrawerClose}
            style={{ position: "absolute", top: "8px", right: "8px" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </Drawer>
      <EditEventDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        editedEvent={editedEvent}
      />
    </div>
  );
}

export default AdminDashboard;
