import React from "react";
import Drawer from "@mui/material/Drawer";
import EditEventForm from "./EditEvent";
import { Typography } from "@mui/material";

const EditEventDrawer = ({ isOpen, onClose, editedEvent }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div style={{ width: "300px", padding: "16px" }}>
        <Typography
          variant="h6"
          style={{ marginBottom: "24px", fontSize: "1.2rem" }}
        >
          Edit Event
        </Typography>
        <EditEventForm editedEvent={editedEvent} onClose={onClose} />
      </div>
    </Drawer>
  );
};

export default EditEventDrawer;
