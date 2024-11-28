import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function SchedulePage() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const savedSchedules = JSON.parse(localStorage.getItem('movieSchedules') || '[]');
    setSchedules(savedSchedules.sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime)));
  }, []);

  const handleDelete = (movieId, scheduledTime) => {
    const updatedSchedules = schedules.filter(
      schedule => !(schedule.movieId === movieId && schedule.scheduledTime === scheduledTime)
    );
    localStorage.setItem('movieSchedules', JSON.stringify(updatedSchedules));
    setSchedules(updatedSchedules);
  };

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
          My Movie Schedule
        </Typography>
      </Box>

      {schedules.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No scheduled movies yet!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {schedules.map((schedule, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500${schedule.posterPath}`}
                  alt={schedule.movieTitle}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {schedule.movieTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Scheduled for: {new Date(schedule.scheduledTime).toLocaleString()}
                  </Typography>
                  {schedule.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Notes: {schedule.notes}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton 
                    onClick={() => handleDelete(schedule.movieId, schedule.scheduledTime)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default SchedulePage; 