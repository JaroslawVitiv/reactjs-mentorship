import { NavLink } from "react-router-dom";
import "./EditDeleteMenu.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import modalSlice from "../Modal/modalSlice";
import type { AppDispatch } from "../../store";
import React from "react";

// Define Movie type (adjust fields based on your actual model)
interface Movie {
  id?: number | string;
  title?: string;
  [key: string]: unknown;
}

interface EditDeleteMenuProps {
  item: Movie;
  handleCloseEditDeleteMenu: (isClosed: boolean) => void;
}

const EditDeleteMenu: React.FC<EditDeleteMenuProps> = ({
  item,
  handleCloseEditDeleteMenu,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = modalSlice.actions;

  const editMovie = (movie: Movie) => {
    const editableItem = { ...movie, operation: "edit" };
    dispatch(openModal(editableItem));
    handleCloseEditDeleteMenu(true);
  };

  const deleteMovie = (movie: Movie) => {
    const deletableItem = { ...movie, operation: "delete" };
    dispatch(openModal(deletableItem));
    handleCloseEditDeleteMenu(true);
  };

  const close = () => {
    handleCloseEditDeleteMenu(true);
  };

  return (
    <div className="edit-delete-menue">
      <button
        style={{ textAlign: "end" }}
        onClick={close}
        className="close-button"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div style={{ textAlign: "start" }} onClick={() => editMovie(item)}>
        <NavLink>Edit</NavLink>
      </div>
      <div style={{ textAlign: "start" }} onClick={() => deleteMovie(item)}>
        <NavLink>Delete</NavLink>
      </div>
    </div>
  );
};

export default EditDeleteMenu;
