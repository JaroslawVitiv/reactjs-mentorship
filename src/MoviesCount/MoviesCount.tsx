import './MoviesCount.css';
import React from 'react';

interface MoviesCountProps {
  moviesCount: number;
}

const MoviesCount: React.FC<MoviesCountProps> = ({ moviesCount }) => {
  return (
    <div className="movies-count">
      {moviesCount} movies found
    </div>
  );
};

export default MoviesCount;
