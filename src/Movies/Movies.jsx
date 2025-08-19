import './Movies.css';
import MovieTile from '../MovieTile/MovieTile';

function Movies({list}) {
  const movieData = list?.data;

  const movies = movieData?.map((item, index) =>
    <div key={index}><MovieTile item={item}/></div>
  );
  return (
    <div className='movies'>
      {movies}
    </div>
  );
}

export default Movies;