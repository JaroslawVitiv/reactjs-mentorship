import React from "react";
import ReactDOM from "react-dom";
import FocusTrap from "focus-trap-react";
import { useSelector, useDispatch } from 'react-redux';
import modalSlice from './modalSlice';
import './Modal.css';
import Dialog from '../Dialog/Dialog';



function Modal() {
  const { isOpen, item } = useSelector((state) => state.modal);
  
  const dispatch = useDispatch();
  const {closeModal} = modalSlice.actions;

  const close = () => {
    dispatch(closeModal());
  }

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <FocusTrap>
      <Dialog item={item} onClose={close} isOpen={isOpen} />
    </FocusTrap>,
    document.getElementById("portal")
  );
};

export default Modal;