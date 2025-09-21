import { Link, useMatch, Route, Routes, useNavigate } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';
import modalSlice from '../Modal/modalSlice';
import MovieDetails from '../MovieDetails/MovieDetails';
import { useDispatch } from 'react-redux';

function Header({ searchMovie }) {
  const dispatch = useDispatch();
  const { openModal } = modalSlice.actions;
  const isMovieRoute = useMatch('/movie/:movieId');

  const addMovie = () => {
    dispatch(openModal(null));
  };

  return (
    <div className="Header">
      <span className="Header-title">
        <Link to="/">
          <strong>netflix</strong>roulette
        </Link>
      </span>
      {isMovieRoute ? (
        <Routes>
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      ) : (
        <>
          <button className='add-movie-button' onClick={addMovie}>
            <Link to="/new">+ add movie</Link>
          </button>
          <SearchForm />
        </>
      )}
    </div>
  );
}

export default Header;
