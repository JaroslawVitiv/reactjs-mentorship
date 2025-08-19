import React, { useState } from 'react';
import '../GenreSelect/GenreSelect.css';
import { NavLink } from 'react-router-dom';
import SortControl from '../SortControl/SortControl';


function GenreSelect({ getCategorySortBy, getCategoryGenres }) {
  const [sortBy, setSortBy] = useState("title");
  const [genres, setGenres] = useState([]);

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
        <SortControl 
          handleSortingBySetting={handSortBySetting} 
          sortBy={sortBy}
         />
      </ul>
      </nav>
    </>  
  );
}

export default GenreSelect;