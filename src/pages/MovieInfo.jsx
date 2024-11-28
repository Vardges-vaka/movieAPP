import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Grid,
  Button,
  Chip,
  Rating,
  Container,
  Paper,
  CardContent,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const API_KEY = "0a5d1e7deb19d327ed314feaf1778015";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
        );
        const data = await response.json();
        setSimilarMovies(data.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    fetchSimilarMovies();
  }, [id]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Typography>Loading...</Typography>
      </Box>
    );

  if (!movie)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Typography>Movie not found</Typography>
      </Box>
    );

  return (
    <Container maxWidth="lg">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
        variant="contained"
        color="primary">
        Back to Home
      </Button>

      <Paper
        elevation={3}
        sx={{ p: 3, backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  height: "auto",

                  maxHeight: "600px",

                  objectFit: "cover",
                }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom component="h1">
              {movie.title}
            </Typography>

            <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <Rating value={movie.vote_average / 2} precision={0.5} readOnly />

              <Typography variant="body2">({movie.vote_average}/10)</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              {movie.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{ mr: 1, mb: 1 }}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>

            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Release Date
                  </Typography>

                  <Typography variant="body1">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Runtime
                  </Typography>

                  <Typography variant="body1">
                    {movie.runtime} minutes
                  </Typography>
                </Grid>

                {movie.budget > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Budget
                    </Typography>

                    <Typography variant="body1">
                      ${movie.budget.toLocaleString()}
                    </Typography>
                  </Grid>
                )}

                {movie.revenue > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Revenue
                    </Typography>

                    <Typography variant="body1">
                      ${movie.revenue.toLocaleString()}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Similar Movies
        </Typography>

        <Grid container spacing={2}>
          {similarMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/movie/${movie.id}`)}>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />

                <CardContent>
                  <Typography variant="subtitle1">{movie.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default MovieInfo;
