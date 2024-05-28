import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    // Load search history from local storage
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(savedHistory);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;

    const updatedHistory = Array.from(new Set([searchTerm, ...searchHistory])).slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    // Perform the search or redirect to the search results page
    console.log('Searching for:', searchTerm);
  };

  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    handleSearch();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() !== '') {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleBlur = () => {
    // Delay hiding the dropdown to allow click events to register
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleFocus = () => {
    if (searchTerm.trim() !== '') {
      setShowDropdown(true);
    }
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <button onClick={handleSearch} style={{ marginTop: '8px' }}>Search</button>
      {showDropdown && (
        <ul
          style={{
            position: 'absolute',
            top: '36px',
            left: '0',
            right: '0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            listStyle: 'none',
            padding: '0',
            margin: '0',
            zIndex: 1000,
          }}
        >
          {searchHistory.map((term, index) => (
            <li
              key={index}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur event from firing
              onClick={() => handleHistoryClick(term)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #ccc',
              }}
            >
              {term}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
