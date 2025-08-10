import './SearchForm.css';
import React, {useState} from 'react';

function SearchForm({findSeachBy}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const setSearch = (searchBy) => {
    findSeachBy(searchBy); 
  };

  return (
    <div className="Search">
      <p className='White-Capitals'>Find your movie</p>
      <p>
        <input 
          value={inputValue}
          onChange={handleInputChange} 
          placeholder="What do you want to watch?" 
          className="Search-bar" 
        />
        <button onClick={() => setSearch(inputValue)} className='Search-button'>search</button>
      </p>
    </div>
  );
}

export default SearchForm;
