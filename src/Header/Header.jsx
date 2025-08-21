import SearchForm from '../SearchForm/SearchForm';
import './Header.css';
import modalSlice from '../Modal/modalSlice';
import MovieDetails from '../MovieDetails/MovieDetails';
import { useSelector, useDispatch } from 'react-redux';


function Header({ getSearchResult}) {
  const dispatch = useDispatch();
  const {openModal} = modalSlice.actions;
  const { isOpen, item } = useSelector((state) => state.movieDetails);

  const handleSearch = (searchBy) => {
    getSearchResult(searchBy); 
  };

  const addMovie = () => {
    dispatch(openModal(null));
  }

  return (
    <div className="Header"> 
      <span className="Header-title">
        <strong>netflix</strong>roulette
      </span>
      {!!item ? (<><MovieDetails item={item} /></>)
      :
      (<><button className='add-movie-button' onClick={addMovie}> + add movie </button>
      <SearchForm findSeachBy={handleSearch} /></>)}
    </div>
  );
}

export default Header;
