import './Movies.css';
import MovieTile from '../MovieTile/MovieTile';
import React from 'react';

interface Movie {
  // Adjust fields based on your API response
  id?: number | string;
  title?: string;
  [key: string]: unknown;
}

interface MoviesList {
  data?: Movie[];
}

interface MoviesProps {
  list?: MoviesList;
}

const Movies: React.FC<MoviesProps> = ({ list }) => {
  const movieData = list?.data;

  const movies = movieData?.map((item, index) => (
    <div key={item.id ?? index}>
      <MovieTile item={item} />
    </div>
  ));

  return <div className="movies">{movies}</div>;
};

export default Movies;
