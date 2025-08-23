import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import MovieForm from '../MovieForm/MovieForm';
import Delete from '../Delete/Delete';


function Dialog({ item, onClose, isOpen}) {

  const close = () => {
    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
    {isOpen && (
      <div 
        className="modal"
        role="dialog"
        aria-modal="true"
      >
        <a onClick={(close)}>
         <span><FontAwesomeIcon icon={faClose} /></span>
        </a>
        {item?.operation === 'delete' ? (<Delete item={item}/>) : (<MovieForm item={item} />)}
    </div>)}
    </>
  );
};

export default Dialog;