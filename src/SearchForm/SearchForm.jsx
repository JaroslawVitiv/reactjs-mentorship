import './SearchForm.css';
import React, {useState} from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchValue = searchParams.get('search') || '';
  const [inputValue, setInputValue] = useState(initialSearchValue);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(prevParams => {
      prevParams.set('searchBy', 'title');
      prevParams.set('search', inputValue);
      return prevParams;
    });
  };

  return (
    <div className="Search">
      <p className='White-Capitals'>Find your movie</p>
      <form onSubmit={handleSearch}>
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="What do you want to watch?"
          className="Search-bar"
        />
        <button type="submit" className='Search-button'>search</button>
      </form>
    </div>
  );
}

export default SearchForm;