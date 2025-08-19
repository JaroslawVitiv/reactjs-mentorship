import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


function SortControl({ handleSortingBySetting, sortBy}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const handleSortBySetting = (sortBy) => {
    handleSortingBySetting(sortBy);
  }
  
  return (
    <li className="dropdown" onClick={toggleDropdown}>
        <a>
          <span>sort by</span> {sortBy}      
          <FontAwesomeIcon icon={faCaretDown} style={{ color: '#F65261', padding: '5px' }} />
        </a>
        {isDropdownOpen && ( 
        <>
         <a onClick={() => handleSortBySetting("title")}>title</a>
         <a onClick={() => handleSortBySetting("release_date")}>release date</a>
        </>
        )}
    </li>  
  );
}

export default SortControl;
