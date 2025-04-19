import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  InputAdornment,
  IconButton,
  CircularProgress,
  Container,
  Paper,
  Divider
} from '@mui/material';
import { Search, Favorite, FavoriteBorder, FitnessCenter, Close } from '@mui/icons-material';

const Home = () => {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteExercises');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteExercises', JSON.stringify(favorites));
  }, [favorites]);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_NINJA_API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        'https://exercisedb.p.rapidapi.com/exercises?limit=100',
        options
      );
      const data = await response.json();

      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.bodyPart.toLowerCase().includes(search.toLowerCase()) ||
        item.equipment.toLowerCase().includes(search.toLowerCase())
      );

      setExercises(filtered);
    } catch (error) {
      console.error('Failed to search exercises:', error);
      setError('Failed to fetch exercises. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearch('');
    setExercises([]);
  };

  const toggleFavorite = (exercise) => {
    if (favorites.some(fav => fav.id === exercise.id)) {
      setFavorites(favorites.filter(fav => fav.id !== exercise.id));
    } else {
      setFavorites([...favorites, exercise]);
    }
  };

  const isFavorite = (exercise) => {
    return favorites.some(fav => fav.id === exercise.id);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section with Gym Background */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '250px', md: '350px' },
          borderRadius: 3,
          overflow: 'hidden',
          mb: 6,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          p: 4,
          boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'
        }}
      >
        <Typography 
          variant="h2" 
          fontWeight="bold" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '2rem', md: '3rem' },
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Find Your Perfect Exercise
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            maxWidth: '700px',
            mb: 3,
            fontSize: { xs: '1rem', md: '1.25rem' },
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          Search through hundreds of exercises to build your ideal workout routine
        </Typography>
        
        {/* Search in Hero */}
        <Paper 
          component="form"
          sx={{ 
            p: '2px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            width: { xs: '100%', sm: '80%', md: '60%' },
            borderRadius: 50,
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by name, body part or equipment..."
            variant="outlined"
            size="small"
            sx={{ 
              ml: 1, 
              flex: 1,
              '& fieldset': { border: 'none' }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton onClick={clearSearch} size="small">
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleSearch}
            disabled={!search.trim() || loading}
            sx={{ 
              borderRadius: 50,
              px: 3,
              py: 1,
              textTransform: 'none',
              backgroundColor: '#ff4757',
              color: 'white',
              '&:hover': {
                backgroundColor: '#ff6b81'
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
          </Button>
        </Paper>
      </Box>

      {/* Results Section */}
      <Box sx={{ mb: 4 }}>
        {error && (
          <Typography color="error" textAlign="center" mb={2}>
            {error}
          </Typography>
        )}

        {exercises.length > 0 && (
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
            {exercises.length} {exercises.length === 1 ? 'Exercise' : 'Exercises'} Found
          </Typography>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" my={6}>
            <CircularProgress size={60} />
          </Box>
        )}

        <Grid container spacing={3}>
          {exercises.length === 0 && !loading && (
            <Grid item xs={12}>
              <Box 
                textAlign="center" 
                sx={{ 
                  p: 4,
                  borderRadius: 2,
                  background: 'rgba(245, 245, 245, 0.8)'
                }}
              >
                <FitnessCenter sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  {search.trim() ? 
                    'No exercises match your search. Try different keywords.' : 
                    'Search for exercises by name, body part, or equipment.'}
                </Typography>
              </Box>
            </Grid>
          )}

          {exercises.map((exercise) => (
            <Grid item key={exercise.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  },
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={exercise.gifUrl}
                    alt={exercise.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <IconButton
                    onClick={() => toggleFavorite(exercise)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)'
                      }
                    }}
                  >
                    {isFavorite(exercise) ? (
                      <Favorite color="error" fontSize="small" />
                    ) : (
                      <FavoriteBorder fontSize="small" />
                    )}
                  </IconButton>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {exercise.name}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={exercise.bodyPart} 
                      size="small" 
                      sx={{ mr: 1, mb: 1, background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' }} 
                    />
                    <Chip 
                      label={exercise.equipment} 
                      size="small" 
                      sx={{ mr: 1, mb: 1, background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }} 
                    />
                    <Chip 
                      label={exercise.target} 
                      size="small" 
                      sx={{ background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer Section */}
      <Divider sx={{ my: 4 }} />
      <Box textAlign="center" sx={{ color: 'text.secondary' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} FitApp - Your Personal Exercise Database
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;