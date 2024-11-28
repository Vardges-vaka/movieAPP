import { 

  Card, 

  CardMedia, 

  CardContent, 

  Typography, 

  CardActions, 

  IconButton 

} from '@mui/material'

import { useNavigate } from 'react-router-dom'

import FavoriteIcon from '@mui/icons-material/Favorite'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

import ScheduleDialog from './ScheduleDialog'

import { useState } from 'react'



function MovieCard({ movie, onAddToFavorites, favorites, onRemoveFromFavorites }) {

  const navigate = useNavigate()

  const isFavorite = favorites?.some(fav => fav.id === movie.id)

  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)



  const handleFavoriteClick = () => {

    if (isFavorite) {

      onRemoveFromFavorites(movie.id)

    } else {

      onAddToFavorites(movie)

    }

  }



  return (

    <Card sx={{ maxWidth: 345, m: 1 }}>

      <CardMedia

        component="img"

        height="400"

        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}

        alt={movie.title}

      />

      <CardContent>

        <Typography gutterBottom variant="h6" component="div">

          {movie.title}

        </Typography>

        <Typography variant="body2" color="text.secondary">

          {movie.overview.slice(0, 100)}...

        </Typography>

      </CardContent>

      <CardActions>

        <IconButton 

          size="small" 

          onClick={() => navigate(`/movie/${movie.id}`)}

          sx={{ mr: 1 }}

        >

          Learn More

        </IconButton>

        <IconButton 

          size="small"

          onClick={handleFavoriteClick}

          color={isFavorite ? "error" : "default"}

        >

          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}

        </IconButton>

        <IconButton

          size="small"

          onClick={() => setScheduleDialogOpen(true)}

          color="primary"

        >

          <CalendarTodayIcon />

        </IconButton>

      </CardActions>

      <ScheduleDialog

        open={scheduleDialogOpen}

        onClose={() => setScheduleDialogOpen(false)}

        movie={movie}

      />

    </Card>

  )

}



export default MovieCard 
