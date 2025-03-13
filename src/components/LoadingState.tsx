
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-movie-primary animate-spin mb-4" />
      <p className="text-movie-text text-lg">Searching for movie...</p>
    </div>
  );
};

export default LoadingState;
