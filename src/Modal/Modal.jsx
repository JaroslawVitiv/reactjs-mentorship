import { useSelector, useDispatch } from 'react-redux';
import modalSlice from './modalSlice';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Edit from '../Edit/Edit';
import Delete from '../Delete/Delete';
import AddMovie from '../AddMovie/AddMovie';


function Modal() {
  const { isOpen, item } = useSelector((state) => state.modal);
  
  const dispatch = useDispatch();
  const {closeModal} = modalSlice.actions;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
        <a onClick={() => dispatch(closeModal())}>
         <span><FontAwesomeIcon icon={faClose} /></span>
        </a>
        {!item && (<AddMovie />)}
        {item?.operation === 'edit' && (<Edit item={item}/>)}
        {item?.operation === 'delete' && (<Delete item={item}/>)}
        
    </div>
  );
};

export default Modal;