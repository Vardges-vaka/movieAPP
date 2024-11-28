import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import MovieCard from '../components/MovieCard';

const API_KEY = "0a5d1e7deb19d327ed314feaf1778015";
const BASE_URL = "https://api.themoviedb.org/3";

function SearchResults({ onAddToFavorites, favorites, onRemoveFromFavorites }) {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('query');

  useEffect(() => {
    const searchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchMovies();
    }
  }, [query]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Search Results for "{query}"
      </Typography>
      {movies.length === 0 ? (
        <Typography>No movies found</Typography>
      ) : (
        <Grid container spacing={2}>
          {movies.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard
                movie={movie}
                onAddToFavorites={onAddToFavorites}
                favorites={favorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default SearchResults; 