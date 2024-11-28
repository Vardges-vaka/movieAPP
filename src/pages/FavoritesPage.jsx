import { Box, Typography, Grid, Button, Container } from '@mui/material';
import MovieCard from '../components/MovieCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function FavoritesPage({ favorites, onAddToFavorites, onRemoveFromFavorites }) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          variant="contained"
          color="primary"
        >
          Back to Home
        </Button>
        <Typography variant="h4">
          My Favorite Movies ({favorites.length})
        </Typography>
      </Box>

      {favorites.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No favorite movies yet. Start adding some!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard
                movie={movie}
                favorites={favorites}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default FavoritesPage; 