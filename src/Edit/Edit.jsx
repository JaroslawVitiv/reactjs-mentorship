import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './Edit.css';
import React, {useState} from 'react';
import SuccessMessage from '../SuccessMessage/SuccessMessage';

function Edit({ item }) {
  const [releaseDate, setReleaseDate] = useState(item.release_date);
  const [movieData, setMovieData] = useState(item);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

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
    setMovieData(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/movies', {
        method: 'PUT',
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
          Edit movie <p>{statusMessage}</p>
        </span>
      <form>
        <div>
          <label>Title</label>
          <input defaultValue={movieData.title} name="title" onChange={handleInputChange} />
        </div>
        <div>
          <label>
            Release date
          </label>
          <input
            type="date"
            name="release_date"
            value={releaseDate}
            onChange={handleDateChange}
          /> 
        </div>
        <div>
          <label>Movie URL</label>
          <input defaultValue={movieData.poster_path} name='poster_path' onChange={handleInputChange} />
        </div>
        <div>
          <label>Rating</label>
          <input defaultValue={movieData.vote_average} name="vote_average" onChange={handleInputChange} />
        </div>
        <div>
          <label>Genre</label>
          <input onChange={handleInputChange} name="genres" />
        </div>
        <div>
          <label>Runtime</label>
          <input defaultValue={movieData.runtime} name="runtime" onChange={handleInputChange} />
        </div>
        <div className="overview">
          <label>Overview</label>
          <textarea defaultValue={movieData.overview} onChange={handleInputChange} />
        </div>
      </form>
      <div className='reset-submit'>
        <button className='reset' onClick={handleReset}>Reset</button>
        <button className='submit' onClick={handleSubmit}>Submit</button>
      </div></>)}
    </div>
  );
};

export default Edit;