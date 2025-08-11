import EditDeleteMenu from '../EditDeleteMenu/EditDeleteMenu';
import Hamburger from '../Hamburger/Hamburger';
import './Movie.css';
import React, { useState } from 'react';
import movieInfoSlice from '../MovieInfo/movieInfoSlice';
import { useDispatch } from 'react-redux';

function Movie({ item }) {
  const [opacity, setOpacity] = useState(1);
  const [isHamburgerVisibile, setIsHamburgerVisibile] = useState(false);
  const [isEditDeleteMenueVisible, setIsEditDeleteMenueVisible] = useState(false);
  const {openMovieInfo} = movieInfoSlice.actions;
  const dispatch = useDispatch();

  const getYear = (date) => {  
      return date ? date.slice(0, 4) : 0;
  }

   const handleMouseOver = () => {
    setOpacity(0.5);
    if(!isEditDeleteMenueVisible) {
      setIsHamburgerVisibile(true);
    }
  };

  const handleMouseOut = () => {
    setOpacity(1);
    setIsHamburgerVisibile(false);
  };

  const hambugerClick = () => {
    setIsHamburgerVisibile(false);
    setIsEditDeleteMenueVisible(true);
  };

  const closeEditDeleteMenu = (isEditDeleteMenuClosed) => {
    setIsEditDeleteMenueVisible(!isEditDeleteMenuClosed);
  };

  const moreAboutMovie = (item) => {
    dispatch(openMovieInfo(item));
  };

  return (
    <div 
      className='movie'
      onMouseOver={() => handleMouseOver(item.id)}
      onMouseOut={handleMouseOut}
      onClick={() => moreAboutMovie(item)}
    >
      <div style={{ opacity: opacity, backgroundImage: `url(${item.poster_path})`, backgroundSize: 'cover', width: '250px', height: '350px' }}>
        {isHamburgerVisibile && (<Hamburger 
          id={item.id}
          handleHamburger={hambugerClick}
        />)}
        {isEditDeleteMenueVisible && (<EditDeleteMenu 
          item={item}
          handleCloseEditDeleteMenu={closeEditDeleteMenu}
        />)}
        
      </div>      
      <div className='title'>
        <div>{item.title}</div>
        <div className='year' >{getYear(item.release_date)}</div>
      </div>
      <div className='genres'>{item.genres.join(', ')}</div>
    </div>
  );
}

export default Movie;