import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";
const API_KEY = "0a5d1e7deb19d327ed314feaf1778015";
const BASE_URL = "https://api.themoviedb.org/3";

function Home({ onAddToFavorites, favorites, onRemoveFromFavorites }) {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [upcomingRes, topRatedRes, nowPlayingRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`),
        ]);

        const [upcoming, topRated, nowPlaying] = await Promise.all([
          upcomingRes.json(),
          topRatedRes.json(),
          nowPlayingRes.json(),
        ]);

        setUpcomingMovies(upcoming.results);
        setTopRatedMovies(topRated.results);
        setNewMovies(nowPlaying.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const MovieSection = ({ title, movies }) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Grid container spacing={2}>
        {movies.map((movie) => (
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
    </Box>
  );

  return (
    <Box>
      <MovieSection title="Upcoming Movies" movies={upcomingMovies} />
      <MovieSection title="Top Rated Movies" movies={topRatedMovies} />
      <MovieSection title="New Movies" movies={newMovies} />
    </Box>
  );
}

export default Home;
