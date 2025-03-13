
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-movie-secondary border-movie-accent text-movie-text pr-10 focus-visible:ring-movie-primary"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-4 w-4 text-movie-text opacity-70" />
          </div>
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !query.trim()} 
          className="bg-movie-primary text-movie-dark hover:bg-movie-primary/90"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
