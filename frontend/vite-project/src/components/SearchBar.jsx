import React, { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ name: searchName, location: searchAddress });
  };

  return (
    <div className='p-5'>
      <form className='flex gap-4' onSubmit={handleSearch}>
        <input
          type="text"
          placeholder='Search By Name'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className='border p-2'
        />
        <input
          type="text"
          placeholder='Search By Address'
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          className='border p-2'
        />
        <button type="submit" className='border p-2 cursor-pointer'>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;