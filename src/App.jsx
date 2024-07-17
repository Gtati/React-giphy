import React, { useState, useEffect } from 'react';
import './App.css'

const API_KEY = "tRuUUCYD7V3ftlQLUKXzMmijYrk6Wjff";
const TRENDING_ENDPOINT = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20`;
const SEARCH_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=20`;


function App() {

  const [gifs, setGifs] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchGifs(TRENDING_ENDPOINT);
  }, []);

  const fetchGifs = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setGifs([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const endpoint = `${SEARCH_ENDPOINT}&q=${searchInput}`;
    fetchGifs(endpoint);
  };

  return (
    <div className='container1'>
      <h1 className='title'>Giphy</h1>
      <form onSubmit={handleSearch}>
        <input
        className='input1'
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search GIFs"
        />
        <button className='btnSearch' type="submit">Search</button>
      </form>
      <div id="containers">
        {gifs.map((gif) => (
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} className="gif" />
        ))}
      </div>
    </div>
  );
};

export default App;