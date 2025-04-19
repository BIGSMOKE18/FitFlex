import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SearchExercises = () => {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);
  const theme = useTheme();

  const handleSearch = async () => {
    if (search.trim()) {
      try {
        // Example using ExerciseDB API or other API
        const response = await fetch(
          `https://api.api-ninjas.com/v1/exercises?muscle=${search}`,
          {
            headers: {
              'X-Api-Key': 'St4IkFuO2vjh6qcjYvT4iQ==JYYPKRpu8pbV6WqQ', // replace with your actual API key
            },
          }
        );
        const data = await response.json();
        console.log("Fetched exercises:", data);

        // Filter exercises based on search term
        const filtered = data.filter((exercise) =>
          exercise.name.toLowerCase().includes(search)
        );

        console.log("Search term:", search);
        console.log("Filtered results:", filtered.length);

        setExercises(filtered);
        setSearch('');
      } catch (error) {
        console.error('Error during search:', error);
      }
    }
  };

  return (
    <Box textAlign="center" mt="30px" px={{ xs: 2, md: 4 }}>
      <Typography variant="h4" mb="20px" sx={{ color: theme.palette.text.primary }}>
        Search Exercises
      </Typography>

      <TextField
        placeholder="e.g. squat, abs, legs"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        sx={{
          width: '300px',
          mr: '10px',
          input: {
            color: theme.palette.text.primary,
          },
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      <Box mt="30px">
        {exercises.length > 0 ? (
          exercises.slice(0, 8).map((exercise, index) => (
            <Box
              key={index}
              mb="30px"
              p="16px"
              boxShadow={3}
              borderRadius={2}
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                textAlign: 'left',
                maxWidth: '700px',
                mx: 'auto',
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {exercise.name}
              </Typography>
              <Typography variant="body2" color={theme.palette.text.secondary} mt={1}>
                Category: {exercise.category || 'None'}
              </Typography>
              <Typography variant="body2" color={theme.palette.text.secondary} mt={1}>
                Equipment: {exercise.equipment || 'None'}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography mt="20px" sx={{ color: theme.palette.text.secondary }}>
            No exercises found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchExercises;
