import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HeroBannerImg from '../assets/banner.jpg';

const HeroBanner = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundImage: `url(${HeroBannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '280px', md: '450px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px',
        mt: { xs: '30px', md: '50px' },
        mx: 'auto',
        p: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Sweat, Smile <br /> and Repeat
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.primary,
          fontSize: { xs: '14px', md: '18px' },
          mb: 4,
        }}
      >
        Get started with personalized workouts tailored to your fitness goals.
      </Typography>
    </Box>
  );
};

export default HeroBanner;







