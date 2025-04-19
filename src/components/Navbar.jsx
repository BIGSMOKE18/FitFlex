// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Link } from 'react-router-dom';

const Navbar = ({ mode, setMode }) => {
  const handleToggle = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" component={Link} to="/">
          <FitnessCenterIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          FitFlex
        </Typography>
        <Switch checked={mode === 'dark'} onChange={handleToggle} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
