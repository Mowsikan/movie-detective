
import React from 'react';
import { Movie } from '@/types/movie';
import { Star, Award, Clock, Film, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { isInFavorites, saveFavorite, removeFavorite } from '@/services/movieService';
import { useToast } from '@/hooks/use-toast';

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavoriteToggle }) => {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = React.useState(isInFavorites(movie.imdbID));

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
      toast({
        title: "Removed from favorites",
        description: `"${movie.Title}" has been removed from your favorites.`,
      });
    } else {
      saveFavorite(movie);
      toast({
        title: "Added to favorites",
        description: `"${movie.Title}" has been added to your favorites.`,
      });
    }
    setIsFavorite(!isFavorite);
    onFavoriteToggle();
  };

  const fallbackPosterUrl = 'https://via.placeholder.com/300x450?text=No+Poster+Available';

  return (
    <Card className="bg-movie-secondary border-movie-accent overflow-hidden movie-card">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 flex-shrink-0">
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : fallbackPosterUrl} 
            alt={`${movie.Title} poster`} 
            className="w-full h-auto object-cover"
          />
        </div>
        <CardContent className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-movie-text mb-1">{movie.Title}</h2>
              <div className="flex gap-2 items-center mb-4">
                <Calendar className="h-4 w-4 text-movie-text opacity-70" />
                <span className="text-sm text-movie-text">{movie.Year}</span>
                <Clock className="h-4 w-4 text-movie-text opacity-70 ml-2" />
                <span className="text-sm text-movie-text">{movie.Runtime}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-movie-primary mr-1" />
              <span className="text-lg font-semibold text-movie-primary">
                {movie.imdbRating !== 'N/A' ? movie.imdbRating : '-'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {movie.Genre.split(', ').map((genre, index) => (
              <Badge key={index} className="bg-movie-accent text-movie-text hover:bg-movie-accent/80">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex gap-2">
              <Film className="h-5 w-5 text-movie-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-movie-primary">Director</p>
                <p className="text-movie-text">{movie.Director !== 'N/A' ? movie.Director : 'Unknown'}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Award className="h-5 w-5 text-movie-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-movie-primary">Cast</p>
                <p className="text-movie-text">{movie.Actors !== 'N/A' ? movie.Actors : 'Unknown'}</p>
              </div>
            </div>
          </div>

          <p className="text-movie-text mb-6">
            {movie.Plot !== 'N/A' ? movie.Plot : 'No plot summary available.'}
          </p>

          <div className="mt-auto">
            <Button 
              variant="outline" 
              className={`mt-2 ${isFavorite ? 'bg-red-600 hover:bg-red-700 text-white border-red-600' : 'border-movie-primary text-movie-primary hover:bg-movie-primary/10'}`}
              onClick={handleFavoriteToggle}
            >
              <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-white' : ''}`} />
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MovieCard;
