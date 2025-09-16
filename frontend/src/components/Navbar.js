import { Link } from "react-router-dom";

// src/components/Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CleanTech Ontario
        </Typography>
        <Button color="inherit" href="/">Dashboard</Button>
        <Button color="inherit" href="/demand">Demand</Button>
        <Button color="inherit" href="/supply">Supply</Button>
        <Button color="inherit" href="/calculator">Calculator</Button>
        <Button color="inherit" href="/about">About</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
