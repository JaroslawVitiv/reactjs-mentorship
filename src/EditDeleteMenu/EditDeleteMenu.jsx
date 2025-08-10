import { NavLink } from 'react-router-dom';
import './EditDeleteMenu.css';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import modalSlice from '../Modal/modalSlice';

function EditDeleteMenu({ item, handleCloseEditDeleteMenu }) {
  const dispatch = useDispatch();
  const {openModal} = modalSlice.actions;

  
  const editMovie = (item) => {
    const editableItem = { ...item, operation: 'edit' };
    dispatch(openModal(editableItem));
    handleCloseEditDeleteMenu(true);
  }

  const deleteMovie = (item) => {
    const deletableItem = { ...item, operation: 'delete' };
    dispatch(openModal(deletableItem));
    handleCloseEditDeleteMenu(true);
  }

  const close = () => {
    handleCloseEditDeleteMenu(true);
  }

  return (
      <div 
        className='edit-delete-menue'
      >
          <a style={{textAlign: 'end'}} onClick={() => close()}>
            <span><FontAwesomeIcon icon={faClose} /></span>
          </a>
          <div style={{textAlign: 'start'}} onClick={() => editMovie(item)}><NavLink>Edit</NavLink></div>
          <div style={{textAlign: 'start'}} onClick={() => deleteMovie(item)}><NavLink>Delete</NavLink></div>
      </div>
  );
}

export default EditDeleteMenu;
