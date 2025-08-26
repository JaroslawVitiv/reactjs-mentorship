import Header from '../Header/Header';
import './App.css';
import GenreSelect from '../GenreSelect/GenreSelect';
import React, { useState, useEffect } from 'react';
import MoviesCount from '../MoviesCount/MoviesCount';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Counter from '../Counter';
import { Provider, useSelector } from 'react-redux';
import store from '../store';
import Modal from '../Modal/Modal';

function App() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backEndUrl, setBackEndUrl] = useState("http://localhost:4000/movies");
  const { isSubmitted } = useSelector((state) => state.modal);


  useEffect(() => {
      callBackEnd(backEndUrl);
  }, [isSubmitted]);

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
        setBackEndUrl(url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
  }
  
  const getSortBy = (sortBy) => {
    callBackEnd('http://localhost:4000/movies?sortOrder=asc&sortBy=' + sortBy);
  };

  const getGenres = (genres) => {
    genres.length > 0 ? callBackEnd('http://localhost:4000/movies?searchBy=genres&filter=' + genres.join(',')) : callBackEnd('http://localhost:4000/movies');
  };

  const searchMovie = (searchBy) => {
    callBackEnd('http://localhost:4000/movies?search=' + searchBy);
  };


  return (    
    <>
      <Modal />
      <div className="App-container">
        <div>
          <Header getSearchResult={searchMovie} />
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

