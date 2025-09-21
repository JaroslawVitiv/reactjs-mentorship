import React from "react";
import ReactDOM from "react-dom";
import FocusTrap from "focus-trap-react";
import { useSelector, useDispatch } from "react-redux";
import modalSlice from "./modalSlice";
import "./Modal.css";
import Dialog from "../Dialog/Dialog";
import type { RootState } from "../../store";
import type { AppDispatch } from "../../store";

const Modal: React.FC = () => {
  const { isOpen, item } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  const { closeModal } = modalSlice.actions;

  const close = () => {
    dispatch(closeModal());
  };

  if (!isOpen) {
    return null;
  }

  const portalElement = document.getElementById("portal");
  if (!portalElement) {
    return null;
  }

  return ReactDOM.createPortal(
    <FocusTrap>
      <Dialog item={item} onClose={close} isOpen={isOpen} />
    </FocusTrap>,
    portalElement
  );
};

export default Modal;
