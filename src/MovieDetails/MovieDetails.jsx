import './MovieDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import movieDetailsSlice from './movieDetailsSlice';

function MovieDetails({ item }) {
  const { openMovieDetails } = movieDetailsSlice.actions;
  const dispatch = useDispatch();

  const close = () => {
    dispatch(openMovieDetails(null));
  };

  const getYear = (date) => {
    return date ? date.slice(0, 4) : 0;
  };

  return (
    <div className="movie-details">
      <br/>
      <a role='link' onClick={close} aria-label="Close movie details" className="close-btn">
        <FontAwesomeIcon icon={faSearch} />
      </a>
      <div className="grid">
        <div><img src={item?.poster_path} alt={`${item?.title} movie poster`} /></div>
        <div className="m-info">
          <div className="title">
            {item?.title}<span>{item?.vote_average}</span>
          </div>
          <div className="genres">{item?.genres?.join(', ')}</div>
          <div className="time">
            <span>{getYear(item?.release_date)}</span>
            <span>{item?.runtime}min</span>
          </div>
          <div className="overview">{item?.overview}</div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
