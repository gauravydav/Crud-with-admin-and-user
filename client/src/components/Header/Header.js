import React from "react";
import { Typography } from "@mui/material";

const Header = () => {
  return (
    <div style={{ backgroundColor: "#0f2761", padding: "1rem",position:"fixed",top:"0",left:"0",right:"0" }}>
      <Typography
        variant="h4"
        style={{
          color: "white",
          width: "5rem",
          margin: "0.5rem auto 0 auto",
          fontSize: "15px",
          fontWeight:"600",
        }}
      >
        SOLGURUZ
      </Typography>
    </div>
  );
};

export default Header;
