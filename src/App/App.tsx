import { useSearchParams } from 'react-router-dom';
import Header from '../Header/Header';
import GenreSelect from '../GenreSelect/GenreSelect';
import React, { useState, useEffect } from 'react';
import MoviesCount from '../MoviesCount/MoviesCount';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Counter from '../Counter';
import { useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import './App.css';

function App() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isSubmitted } = useSelector((state) => state.modal);
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const query = new URLSearchParams(params).toString();
    const url = `http://localhost:4000/movies?${query}${getUrlQuery(genres)}`;
    callBackEnd(url);
  }, [searchParams, isSubmitted, toggle]);

  function getUrlQuery(genres) {
    if (!Array.isArray(genres) || genres.length === 0) {
        console.error("Input must be a non-empty array of strings.");
        return "";
    }
    return `&searchBy=genres&filter=${genres.join(',')}`;
  }

  const callBackEnd = async (url) => {
    try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
  }

  const getSortBy = (sortBy) => {
    setSearchParams(prevParams => {
      prevParams.set('sortBy', sortBy);
      prevParams.set('sortOrder', 'asc');
      return prevParams;
    });
  };

  const getGenres = (genres) => {
    setToggle(!toggle);
    setGenres(genres);
  };

  const searchMovie = (searchBy) => {
    setSearchParams(prevParams => {
      prevParams.set('searchBy', 'title');
      prevParams.set('search', searchBy);
      return prevParams;
    });
  };

  return (
    <>
      <Modal />
      <div className="App-container">
        <div>
          <Header searchMovie={searchMovie} />
        </div>
        <div><Counter /></div>
        <br/>
        {loading && (<div>Loading movies...</div>)}
        <div className='body'>
          <div><GenreSelect getCategorySortBy={getSortBy} getCategoryGenres={getGenres} /></div>
          <div><MoviesCount moviesCount={movies?.totalAmount} /></div>
          <div><Movies list={movies} /></div>
        </div>
        <div><Footer /></div>
      </div>
    </>
  );
}

export default App;