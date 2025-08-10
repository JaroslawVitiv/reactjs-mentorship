import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './Delete.css';
import React, {useState} from 'react';
import SuccessMessage from '../SuccessMessage/SuccessMessage'

function Delete({ item }) {
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/movies/' + item?.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        if (response.headers.get('Content-Length') > 0) {
          const result = await response.json();
        }
        setSuccess(true);
      } else {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='delete-modal'>
        {success ? (
            <SuccessMessage type={'deleted'}/>
          ) : (
             <>
                <span>Delete movie</span>
                <div>Are you sure you want to delete this movie?</div>
                <button onClick={handleSubmit}>confirm</button>
             </>
            )}
    </div>
  );
};

export default Delete;