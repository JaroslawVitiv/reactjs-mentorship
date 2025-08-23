import './MovieForm.css';
import React, {useState} from 'react';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import GenreDropdown from '../GenreDropdown/GenreDropdown';
import { useDispatch } from 'react-redux';
import modalSlice from '../Modal/modalSlice';


function MovieForm({ item }) {
  const [releaseDate, setReleaseDate] = useState(item?.release_date);
  const [movieData, setMovieData] = useState(item || {});
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [formGenres, setFormGenres] = useState(item?.genres || []);
  const dispatch = useDispatch();
  const {submitModal} = modalSlice.actions;

  const emptyMovie = {
    title: '',
    vote_average: '',
    release_date: '',
    overview: '',
    genres: [],
    runtime: '',
    poster_path: ''
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (event) => {
    setReleaseDate(event.target.value);
  };

  const handleReset = () => {
    setMovieData(!item ? emptyMovie : item);
  };

  const handleGenres = (genres) => {
    setFormGenres(genres);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = !item ? 'POST' : 'PUT';

    const { operation, runtime, vote_average, release_date, genres, ...movieDataWithoutOperation } = movieData;

    const payload = { ...movieDataWithoutOperation, runtime: parseInt(runtime), vote_average: parseFloat(vote_average), release_date: releaseDate, genres: formGenres};

    try {
      const response = await fetch('http://localhost:4000/movies', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(submitModal());
        setSuccess(true);
      } else {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className='edit-modal'>
      { success ? (
          <SuccessMessage type={'updated'}/>
        ) 
        :
       (
       <>
        <span className='title'>
          {!item ? ('Add') : ('Edit')} movie <p>{statusMessage}</p>
        </span>
      <form className='main-form'>
        <div className='container'>
          <label className='main-label' htmlFor='title'>Title</label>
          <input 
            id='title'
            value={movieData?.title} 
            name="title" 
            onChange={handleInputChange} 
          />
        </div>
        <div className='container'>
          <label className='main-label' htmlFor='release-date'>
            Release date
          </label>
          <input
            type="date"
            id="release-date"
            name="release_date"
            value={releaseDate}
            onChange={handleDateChange}
        />
        </div>
        <div className='container'>
          <label className='main-label' htmlFor='movie-url'>Movie URL</label>
          <input 
            id='movie-url' // Add a unique ID
            value={movieData?.poster_path} 
            name='poster_path' 
            onChange={handleInputChange} 
            placeholder='http://'
          />
        </div>
        <div className='container'>
          <label className='main-label' htmlFor='rating'>Rating</label>
          <input 
            id='rating'
            value={movieData?.vote_average} 
            name="vote_average" 
            onChange={handleInputChange} 
          />
        </div>
        <div className='container'>
          <label className='main-label'>Genre</label>
          <GenreDropdown item={item} getGenres={handleGenres} />
        </div>
        <div className='container'>
          <label className='main-label' htmlFor='runtime'>Runtime</label>
          <input 
            id='runtime'
            value={movieData?.runtime} 
            name="runtime" 
            onChange={handleInputChange} 
          />
        </div>
        <div className="container overview">
        <label className='main-label' htmlFor='overview'>Overview</label>
        <textarea 
          id='overview' // Add a unique ID
          value={movieData?.overview} 
          onChange={handleInputChange} 
          name='overview'
        />
      </div>
      </form>
      <div className='reset-submit'>
        <button className='reset' onClick={handleReset}>Reset</button>
        <button className='submit' onClick={handleSubmit}>Submit</button>
      </div>
      </>
    )}
    </div>
  );
};

export default MovieForm;