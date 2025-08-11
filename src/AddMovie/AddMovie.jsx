import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './AddMovie.css';
import React, {useState} from 'react';
import SuccessMessage from '../SuccessMessage/SuccessMessage';

function AddMovie() {
  const emptyMovie = {
    title: '',
    vote_average: '',
    release_date: '',
    overview: '',
    genres: ['crime'],
    runtime: '',
    poster_path: ''
  };
  const [movieData, setMovieData] = useState(emptyMovie);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === 'vote_average' || name === 'runtime') {
        setMovieData(prevState => ({
          ...prevState,
          [name]: Number(value),
        }));
    } else {
       setMovieData(prevState => ({
          ...prevState,
          [name]: value,
       }));
    }
  };

  const handleDateChange = (e) => {
    setReleaseDate(e.target.value);
    const { name, value } = e.target;
    setMovieData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleReset = () => {
    setMovieData(emptyMovie);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        const result = await response.json();
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
       (<>
        <span>
          Edit movie
        </span>
         <p>{statusMessage}</p>
      <form>
        <div>
          <label>Title</label>
          <input defaultValue={movieData.title} name="title" value={movieData.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>
            Release date
          </label>
          <input
            type="date"
            name="release_date"
            defaultValue={movieData.release_date}
            value={releaseDate}
            onChange={handleDateChange}
          /> 
        </div>
        <div>
          <label>Movie URL</label>
          <input defaultValue={movieData.poster_path} name='poster_path' value={movieData.poster_path} onChange={handleInputChange} />
        </div>
        <div>
          <label>Rating</label>
          <input defaultValue={movieData.vote_average} name="vote_average" value={movieData.vote_average} onChange={handleInputChange} />
        </div>
        <div>
          <label>Genre</label>
          <input name="genres" value={movieData.genres} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Runtime</label>
          <input defaultValue={movieData.runtime} name="runtime" onChange={handleInputChange} value={movieData.runtime} />
        </div>
        <div className="overview">
          <label>Overview</label>
          <textarea name="overview" onChange={handleInputChange} value={movieData.overview} />
        </div>
      </form>
      <div className='reset-submit'>
        <button className='reset' onClick={handleReset}>Reset</button>
        <button className='submit' onClick={handleSubmit}>Submit</button>
      </div></>)}
    </div>
  );
};

export default AddMovie;