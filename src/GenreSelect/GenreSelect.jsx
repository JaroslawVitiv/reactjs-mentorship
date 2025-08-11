import React, { useState } from 'react';
import '../GenreSelect/GenreSelect.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

function GenreSelect({ getCategorySortBy, getCategoryGenres }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("title");
  const [genres, setGenres] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handSortBySetting = (sortBy) => {
    setSortBy(sortBy.replace(/_/g, " "));
    getCategorySortBy(sortBy); 
  };

  const selectGenre = (genre) => {    
    if (genre == null) {
      setGenres([]);
      getCategoryGenres([]);
    } else {
      let genresArr = genres;
      if (!genresArr.includes(genre)) {
        genresArr.push(genre);
      } else {
        genresArr = genresArr.filter(g => g !== genre);
      }
      setGenres(genresArr);
      getCategoryGenres(genresArr);
    }
  }

  return (
    <>
    <nav className='categories'>
      <ul>
        <li>
          <NavLink 
            className={() => (genres.length === 0 ? 'active-link' : 'inactive-link')} 
            onClick={() => selectGenre(null)}
          >
              all
          </NavLink>
        </li>
        <li>
          <NavLink 
              className={() => (genres?.includes('documentary') ? 'active-link' : 'inactive-link')}
              onClick={() => selectGenre('documentary')}
          >
              documentary
          </NavLink>
        </li>
        <li>
          <NavLink 
              className={() => (genres?.includes('comedy') ? 'active-link' : 'inactive-link')}
              onClick={() => selectGenre('comedy')}
          >
              comedy
          </NavLink>
        </li>
        <li>
          <NavLink 
              className={() => (genres?.includes('horror') ? 'active-link' : 'inactive-link')}
              onClick={() => selectGenre('horror')}
          >
              horror
          </NavLink>
        </li>
        <li>
          <NavLink 
              className={() => (genres?.includes('crime') ? 'active-link' : 'inactive-link')}
              onClick={() => selectGenre('crime')}
          >
              crime
          </NavLink>
        </li>
        <li>
          <NavLink 
              className={() => (genres?.includes('drama') ? 'active-link' : 'inactive-link')}
              onClick={() => selectGenre('drama')}
          >
              drama
          </NavLink>
        </li>

        <li className="dropdown" onClick={toggleDropdown}>
          <a>
            <span>sort by</span> {sortBy}      
            <FontAwesomeIcon icon={faCaretDown} style={{ color: '#F65261', padding: '5px' }} />
          </a>
          {isDropdownOpen && ( 
            <>
              <a onClick={() => handSortBySetting("vote_count")}>vote count</a>
              <a onClick={() => handSortBySetting("title")}>title</a>
              <a onClick={() => handSortBySetting("release_date")}>release date</a>
            </>
          )}
        </li>
      </ul>
      </nav>
    </>  
  );
}

export default GenreSelect;