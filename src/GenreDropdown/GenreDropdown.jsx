import React, { useState, useEffect, useRef } from 'react';
import './GenreDropdown.css';


function GenreDropdown({ item, getGenres }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(item?.genres || []);
  const dropdownRef = useRef(null);

  const options = [
    "Drama",
    "Comedy",
    "Horror",
    "Tragedy",
    "Crime",
    "Action",
    "Fantasy",
    "Adventure"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    if (selectedItems.includes(option)) {
      setSelectedItems(selectedItems.filter((item) => item !== option));
      getGenres(selectedItems.filter((item) => item !== option));
    } else {
      setSelectedItems([...selectedItems, option]);
      getGenres([...selectedItems, option]);
    }
  };

  const handleRemoveTag = (itemToRemove) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
    getGenres(selectedItems.filter((item) => item !== itemToRemove));
  };

  return (
    <div 
      className="dropdown-container" 
      ref={dropdownRef}
    >

      <div
        id="select-input"
        className="select-input"
        onClick={handleToggle}
      >
        {selectedItems?.length === 0 && (
          <span
            className="placeholder-text"
            >Select options</span>
        )}

        {selectedItems.map((item) => (
          <div
            key={item}
            className="selected-pill"
          >
            <span>{item}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveTag(item);
              }}
              className="close-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        <button
          id="dropdown-button"
          type="button"
          className="dropdown-button"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className={`chevron-triangle ${isOpen ? 'rotate-180' : ''}`}></span>
        </button>
      </div>

      {isOpen && (
        <div
          id="dropdown-menu"
          className="dropdown-menu"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="menu-items-wrapper" role="none">
            {options.map((option) => (
              <div
                key={option}
                className="dropdown-menu-item"
                onClick={() => handleSelect(option)}
              >
                <input
                  type="checkbox"
                  className="checkbox"
                  readOnly
                  checked={selectedItems.includes(option)}
                />
                <label 
                  className="checkbox-label"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;