import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

const ExerciseDetail = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'd2d195676bmshe481a7f23c5a718p181cbejsnf16125beebb7',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        });

        const data = await res.json();
        setExercise(data);
      } catch (error) {
        console.error('Error fetching exercise detail:', error);
      }
    };

    fetchExercise();
  }, [id]);

  if (!exercise) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box p={4} textAlign="center">
      <Typography variant="h4" gutterBottom>{exercise.name}</Typography>
      <img src={exercise.gifUrl} alt={exercise.name} width="300" style={{ borderRadius: 8 }} />
      <Typography variant="h6" mt={2}>Body Part: {exercise.bodyPart}</Typography>
      <Typography variant="h6">Target Muscle: {exercise.target}</Typography>
      <Typography variant="h6">Equipment: {exercise.equipment}</Typography>
    </Box>
  );
};

export default ExerciseDetail;
