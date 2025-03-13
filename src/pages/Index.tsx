
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/types/movie';
import { 
  searchMovieByTitle,
  isMovieResponse,
  getFavorites
} from '@/services/movieService';
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import FavoritesList from '@/components/FavoritesList';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingState from '@/components/LoadingState';
import { Film } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // Fetch favorites from localStorage on mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Update favorites when they change
  const handleFavoritesChange = () => {
    setFavorites(getFavorites());
  };

  // Search for movies
  const { 
    data: movieData,
    isLoading,
    isError,
    error,
    refetch 
  } = useQuery({
    queryKey: ['movie', searchQuery],
    queryFn: () => searchMovieByTitle(searchQuery),
    enabled: searchQuery !== '',
    staleTime: 300000, // 5 minutes
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    refetch();
  };

  const handleSelectFavorite = (movie: Movie) => {
    setSelectedMovie(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine what to display in the main content area
  const renderMainContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (isError) {
      return <ErrorDisplay message="An error occurred while fetching data. Please try again." />;
    }

    if (movieData) {
      if (isMovieResponse(movieData)) {
        return (
          <MovieCard 
            movie={selectedMovie || movieData} 
            onFavoriteToggle={handleFavoritesChange} 
          />
        );
      } else {
        return <ErrorDisplay message={movieData.Error} />;
      }
    }

    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Film className="h-16 w-16 text-movie-primary/50 mb-4 animate-pulse-gentle" />
        <h2 className="text-2xl font-bold text-movie-text mb-2">
          Find your favorite movies
        </h2>
        <p className="text-muted-foreground max-w-md">
          Search for a movie by title to see detailed information, ratings, and more.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-movie-dark pb-12">
      <header className="bg-movie-secondary py-6 mb-8 border-b border-movie-accent">
        <div className="container">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-movie-primary mb-6 flex items-center">
              <Film className="mr-2 h-8 w-8" />
              Movie Info Finder
            </h1>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </header>

      <main className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {renderMainContent()}
          </div>
          <div className="md:col-span-1">
            <FavoritesList 
              favorites={favorites} 
              onSelectMovie={handleSelectFavorite} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
