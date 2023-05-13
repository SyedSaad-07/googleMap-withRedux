import React, {useState} from 'react'

const SearchInput = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleInputChange = (event) => {
      setQuery(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSearch(query);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
    );
  };
export default SearchInput
