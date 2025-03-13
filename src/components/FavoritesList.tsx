
import React from 'react';
import { Movie } from '@/types/movie';
import { Heart, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

interface FavoritesListProps {
  favorites: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onSelectMovie }) => {
  if (favorites.length === 0) {
    return (
      <Card className="bg-movie-secondary border-movie-accent">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-6">
            <Heart className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-movie-text text-center">No favorite movies yet.</p>
            <p className="text-sm text-muted-foreground text-center mt-1">
              Search for movies and add them to your favorites!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-movie-secondary border-movie-accent">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-movie-primary mb-3 flex items-center">
          <Heart className="h-5 w-5 mr-2" />
          Your Favorites
        </h3>
        <ScrollArea className="h-96 rounded-md">
          <div className="space-y-2">
            {favorites.map((movie) => (
              <div 
                key={movie.imdbID}
                className="flex items-start p-2 rounded-md hover:bg-movie-accent/20 cursor-pointer transition-colors"
                onClick={() => onSelectMovie(movie)}
              >
                <div className="flex-shrink-0 w-12 h-16 overflow-hidden rounded mr-3">
                  <img 
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/45x68?text=N/A'} 
                    alt={movie.Title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-movie-text truncate">{movie.Title}</h4>
                  <p className="text-xs text-muted-foreground">{movie.Year}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-movie-primary mr-1" />
                    <span className="text-xs">{movie.imdbRating !== 'N/A' ? movie.imdbRating : '-'}</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground self-center" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FavoritesList;
