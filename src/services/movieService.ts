
import { Movie, MovieResponse } from "../types/movie";

const API_KEY = "dbf5e12d";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovieByTitle = async (title: string): Promise<MovieResponse> => {
  try {
    const response = await fetch(`${BASE_URL}?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return {
      Response: "False",
      Error: "Failed to fetch movie data. Please try again later."
    };
  }
};

export const isMovieResponse = (data: MovieResponse): data is Movie => {
  return data.Response === "True";
};

// Save a movie to favorites
export const saveFavorite = (movie: Movie): void => {
  try {
    const favorites = getFavorites();
    
    // Check if movie already exists in favorites
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("Error saving to favorites:", error);
  }
};

// Remove a movie from favorites
export const removeFavorite = (imdbID: string): void => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

// Get all favorites
export const getFavorites = (): Movie[] => {
  try {
    const favorites = localStorage.getItem('movieFavorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

// Check if a movie is in favorites
export const isInFavorites = (imdbID: string): boolean => {
  try {
    const favorites = getFavorites();
    return favorites.some(movie => movie.imdbID === imdbID);
  } catch (error) {
    console.error("Error checking favorites:", error);
    return false;
  }
};
