import './MoviesCount.css'

function MoviesCount({moviesCount}) {
  return (
    <div className="movies-count">
      {moviesCount} movies found
    </div>
  );
}

export default MoviesCount;