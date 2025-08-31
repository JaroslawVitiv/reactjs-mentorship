import EditDeleteMenu from '../EditDeleteMenu/EditDeleteMenu';
import Hamburger from '../Hamburger/Hamburger';
import './MovieTile.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MovieTile({ item }) {
  const [opacity, setOpacity] = useState(1);
  const [isHamburgerVisibile, setIsHamburgerVisibile] = useState(false);
  const [isEditDeleteMenueVisible, setIsEditDeleteMenueVisible] = useState(false);

  const getYear = (date) => {
    return date ? date.slice(0, 4) : 0;
  };

  const handleMouseOver = () => {
    setOpacity(0.5);
    if (!isEditDeleteMenueVisible) {
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

  return (
    <div
      className='movie-tile'
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link to={`/movie/${item.id}`} className="movie-tile-link" aria-label={item.title}>
        <div style={{ opacity: opacity, backgroundImage: `url(${item.poster_path})`, backgroundSize: 'cover', width: '250px', height: '350px' }}>
          {isHamburgerVisibile && (
            <Hamburger
              id={item.id}
              handleHamburger={hambugerClick}
            />
          )}
          {isEditDeleteMenueVisible && (
            <EditDeleteMenu
              item={item}
              handleCloseEditDeleteMenu={closeEditDeleteMenu}
            />
          )}
        </div>
      </Link>
      <div className='title'>
        <div>{item.title}</div>
        <div className='year'>{getYear(item.release_date)}</div>
      </div>
      <div className='genres'>{item.genres.join(', ')}</div>
    </div>
  );
}

export default MovieTile;