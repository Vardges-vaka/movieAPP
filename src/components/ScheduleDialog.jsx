import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
} from "@mui/material";

function ScheduleDialog({ open, onClose, movie }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const handleSchedule = () => {
    const dateTime = new Date(`${selectedDate}T${selectedTime}`);

    const schedule = {
      movieId: movie.id,
      movieTitle: movie.title,
      scheduledTime: dateTime.toISOString(),
      notes: notes,
      posterPath: movie.poster_path,
    };

    // Get existing schedules from localStorage

    const existingSchedules = JSON.parse(
      localStorage.getItem("movieSchedules") || "[]"
    );
    const newSchedules = [...existingSchedules, schedule];
    localStorage.setItem("movieSchedules", JSON.stringify(newSchedules));
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setSelectedDate("");
      setSelectedTime("");
      setNotes("");
    }, 1500);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Schedule "{movie?.title}"</DialogTitle>
      <DialogContent>
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Movie scheduled successfully!
          </Alert>
        )}
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <TextField
            type="date"
            label="Date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            type="time"
            label="Time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>

        <TextField
          margin="dense"
          label="Notes"
          multiline
          rows={4}
          fullWidth
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          onClick={handleSchedule}
          variant="contained"
          color="primary"
          disabled={!selectedDate || !selectedTime}>
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ScheduleDialog;
