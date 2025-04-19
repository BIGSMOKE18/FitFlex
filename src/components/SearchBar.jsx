// SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const bodyPartsList = ['all', 'chest', 'back', 'legs', 'arms', 'shoulders', 'abs'];

const handleSearch = async () => {
    try {
      const response = await fetch(
        'https://exercisedb.p.rapidapi.com/exercises',
        options
      );
      const data = await response.json();  // Parse the JSON response
      console.log('Raw data from API:', data);  // Log raw data
  
      // Proceed with filtering after logging
      const filtered = data.filter((exercise) =>
        exercise.name?.toLowerCase().includes(search.toLowerCase())
      );
      console.log('Filtered results:', filtered);
  
      setResults(filtered);  // Update the state with filtered exercises
    } catch (error) {
      console.error('Failed to search exercises:', error);
    }
  };
  
  return (
    <Box textAlign="center" mt={4}>
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search exercises"
        sx={{ width: '300px', mr: 2 }}
      />
      <FormControl sx={{ minWidth: 120, mr: 2 }}>
        <InputLabel>Body Part</InputLabel>
        <Select
          value={bodyPart}
          label="Body Part"
          onChange={(e) => setBodyPart(e.target.value)}
        >
          {bodyPartsList.map((part) => (
            <MenuItem key={part} value={part}>
              {part.charAt(0).toUpperCase() + part.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );


export default SearchBar;
