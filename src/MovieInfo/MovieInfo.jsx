import './MovieInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import movieInfoSlice from '../MovieInfo/movieInfoSlice';

function MovieInfo({ item }) {
  const {openMovieInfo} = movieInfoSlice.actions;
  const dispatch = useDispatch();
  
  const close = () => {
    dispatch(openMovieInfo(null));
  }

  const getYear = (date) => {  
      return date ? date.slice(0, 4) : 0;
  }

  return (
    <div className="movie-info">
        <a onClick={close}>
         <span><FontAwesomeIcon icon={faSearch} /></span>
        </a>
        <div className='grid'>
          <div><img src={item?.poster_path} /></div>
          <div className='m-info'>
            <div className='title'>{item?.title}<span>{item?.vote_average}</span></div>
            <div className='genres'>{item?.genres?.join(', ')}</div>
            <div className='time'><span>{getYear(item?.release_date)}</span><span>{item?.runtime}min</span></div>
            <div className='overview'>{item?.overview}</div>
          </div>
        </div>
    </div>
  );
};

export default MovieInfo;