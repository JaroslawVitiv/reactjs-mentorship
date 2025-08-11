import './Movies.css';
import Movie from '../Movie/Movie';

function Movies({list}) {
  const movieData = list?.data;

  const movies = movieData?.map((item, index) =>
    <div key={index}><Movie item={item}/></div>
  );
  return (
    <div className='movies'>
      {movies}
    </div>
  );
}

export default Movies;