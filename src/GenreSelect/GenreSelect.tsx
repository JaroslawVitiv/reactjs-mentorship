import React, { useState } from 'react';
import '../GenreSelect/GenreSelect.css';
import { NavLink } from 'react-router-dom';
import SortControl from '../SortControl/SortControl';

interface GenreSelectProps {
  getCategorySortBy: (sortBy: string) => void;
  getCategoryGenres: (genres: string[]) => void;
}

const GenreSelect: React.FC<GenreSelectProps> = ({ getCategorySortBy, getCategoryGenres }) => {
  const [sortBy, setSortBy] = useState<string>("title");
  const [genres, setGenres] = useState<string[]>([]);

  const handSortBySetting = (sortByValue: string) => {
    setSortBy(sortByValue.replace(/_/g, " "));
    getCategorySortBy(sortByValue);
  };

  const selectGenre = (genre: string | null) => {
    if (!genre) {
      setGenres([]);
      getCategoryGenres([]);
    } else {
      let genresArr = [...genres]; // create a new array to avoid mutation
      if (!genresArr.includes(genre)) {
        genresArr.push(genre);
      } else {
        genresArr = genresArr.filter(g => g !== genre);
      }
      setGenres(genresArr);
      getCategoryGenres(genresArr);
    }
  };

  return (
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
        {['documentary', 'comedy', 'horror', 'crime', 'drama'].map((genre) => (
          <li key={genre}>
            <NavLink
              className={() => (genres.includes(genre) ? 'active-link' : 'inactive-link')}
              onClick={() => selectGenre(genre)}
            >
              {genre}
            </NavLink>
          </li>
        ))}
        <SortControl
          handleSortingBySetting={handSortBySetting}
          sortBy={sortBy}
        />
      </ul>
    </nav>
  );
};

export default GenreSelect;
