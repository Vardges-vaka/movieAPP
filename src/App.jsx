import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieInfo from "./pages/MovieInfo";
import SearchResults from "./pages/SearchResults";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
import FavoritesPage from "./pages/FavoritesPage";
import SchedulePage from "./pages/SchedulePage";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [mode, setMode] = useState("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const addToFavorites = (movie) => {
    if (!favorites.find((fav) => fav.id === movie.id)) {
      const newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (movieId) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            bgcolor: "background.default",
            color: "text.primary",
            minHeight: "100vh",
          }}>
          <Header
            favorites={favorites}
            onRemoveFavorite={removeFromFavorites}
            mode={mode}
            onToggleTheme={() => setMode(mode === "light" ? "dark" : "light")}
          />
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    onAddToFavorites={addToFavorites}
                    favorites={favorites}
                    onRemoveFromFavorites={removeFromFavorites}
                  />
                }
              />
              <Route path="/movie/:id" element={<MovieInfo />} />
              <Route
                path="/search"
                element={
                  <SearchResults
                    onAddToFavorites={addToFavorites}
                    favorites={favorites}
                    onRemoveFromFavorites={removeFromFavorites}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <FavoritesPage
                    favorites={favorites}
                    onAddToFavorites={addToFavorites}
                    onRemoveFromFavorites={removeFromFavorites}
                  />
                }
              />
              <Route path="/schedule" element={<SchedulePage />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
