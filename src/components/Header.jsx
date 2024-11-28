import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Box,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function Header({ favorites, onRemoveFavorite, mode, onToggleTheme }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Get search history from localStorage

  const searchHistory = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // Save to search history
      const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      const newHistory = [
        { query: searchQuery, timestamp: new Date().toISOString() },
        ...history,
      ].slice(0, 10); // Keep only last 10 searches
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };
  const handleHistoryItemClick = (query) => {
    navigate(`/search?query=${query}`);
    setHistoryDialogOpen(false);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 0, mr: 2 }}>
            Movie App
          </Typography>

          <Box
            sx={{
              position: "relative",

              borderRadius: 1,

              backgroundColor: (theme) =>
                alpha(theme.palette.common.white, 0.15),

              "&:hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.common.white, 0.25),
              },

              marginRight: 2,

              marginLeft: 0,

              width: "100%",

              maxWidth: "400px",
            }}>
            <Box
              sx={{
                padding: "0 16px",

                height: "100%",

                position: "absolute",

                display: "flex",

                alignItems: "center",
              }}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              sx={{
                color: "inherit",
                padding: "8px 8px 8px 48px",
                width: "100%",
              }}
            />
          </Box>
          <IconButton
            color="inherit"
            onClick={() => setHistoryDialogOpen(true)}
            sx={{ ml: 1 }}>
            <HistoryIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => navigate("/favorites")}
            sx={{ ml: 1 }}>
            <FavoriteIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => navigate("/schedule")}
            sx={{ ml: 1 }}>
            <CalendarTodayIcon />
          </IconButton>
          <IconButton sx={{ ml: 1 }} onClick={onToggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 300 }}>
          <ListItem>
            <Typography variant="h6">Favorite Movies</Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("/favorites");

              setDrawerOpen(false);
            }}>
            <Button startIcon={<FavoriteIcon />} variant="contained" fullWidth>
              View All Favorites
            </Button>
          </ListItem>
          {favorites.map((movie) => (
            <ListItem
              key={movie.id}
              button
              onClick={() => navigate(`/movie/${movie.id}`)}>
              <ListItemText
                primary={movie.title}
                secondary={`Rating: ${movie.vote_average}/10`}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();

                  onRemoveFavorite(movie.id);
                }}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Dialog
        open={historyDialogOpen}
        onClose={() => setHistoryDialogOpen(false)}
        maxWidth="sm"
        fullWidth>
        <DialogTitle>Search History</DialogTitle>

        <DialogContent>
          {searchHistory.length === 0 ? (
            <Typography>No search history yet</Typography>
          ) : (
            <List>
              {searchHistory.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleHistoryItemClick(item.query)}>
                  <ListItemText
                    primary={item.query}
                    secondary={new Date(item.timestamp).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
