import React from 'react';
import { Box, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Exercises = ({ exercises }) => {
  const navigate = useNavigate();

  return (
    <Box mt={4} display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
      {exercises.length > 0 ? (
        exercises.map((exercise) => (
          <Card key={exercise.id} sx={{ width: 300 }}>
            <CardActionArea onClick={() => navigate(`/exercise/${exercise.id}`)}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {exercise.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Body Part: {exercise.bodyPart}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Target: {exercise.target}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Equipment: {exercise.equipment}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography mt={4}>No exercises found.</Typography>
      )}
    </Box>
  );
};

export default Exercises;
