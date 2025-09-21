import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import MovieForm from "../MovieForm/MovieForm";
import Delete from "../Delete/Delete";

interface Movie {
  id?: number | string;
  title?: string;
  operation?: "edit" | "delete";
  [key: string]: unknown;
}

interface DialogProps {
  item?: Movie | null;
  onClose: () => void;
  isOpen: boolean;
}

const Dialog: React.FC<DialogProps> = ({ item, onClose, isOpen }) => {
  const close = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <button
        onClick={close}
        aria-label="Close dialog"
        className="close-button"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      {item?.operation === "delete" ? (
        <Delete item={item} />
      ) : (
        <MovieForm item={item} />
      )}
    </div>
  );
};

export default Dialog;
