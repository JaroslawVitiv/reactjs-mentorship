import './MovieDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MovieDetails() {
  const [item, setItem] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if movieId exists before fetching
    if (movieId) {
      fetch(`http://localhost:4000/movies/${movieId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setItem(data))
        .catch(error => {
          console.error("Could not fetch movie details:", error);
          setItem(null);
        });
    }
  }, [movieId]);

  const close = () => {
    navigate('/');
  };

  const getYear = (date) => {
    return date ? date.slice(0, 4) : 0;
  };

  if (!item) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className="movie-details">
      <br/>
      <a role='link' onClick={close} aria-label="Close movie details" className="close-btn">
        <FontAwesomeIcon icon={faSearch} />
      </a>
      <div className="grid">
        <div><img src={item?.poster_path} alt={`${item?.title} movie poster`} /></div>
        <div className="m-info">
          <div className="title">
            {item?.title}<span>{item?.vote_average}</span>
          </div>
          <div className="genres">{item?.genres?.join(', ')}</div>
          <div className="time">
            <span>{getYear(item?.release_date)}</span>
            <span>{item?.runtime}min</span>
          </div>
          <div className="overview">{item?.overview}</div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;