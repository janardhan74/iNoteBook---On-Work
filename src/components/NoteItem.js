import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = ({ note, updateNote }) => {
  const { deleteNote , showAlert } = useContext(NoteContext);

  return (
    <div className="card" style={{ width: "15rem", margin: "5px" }}>
      <div className="card-body">
        <div className="d-flex align-items-center my-2">
          <h5 className="card-title my-0">{note.title}</h5>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deleteNote(note._id);
              showAlert("Successfully deleted Note","success");
            }}
          ></i>
          <i
            className="fa-regular fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
};

export default NoteItem;

// <a href="#" className="card-link">
// Card link
// </a>
// <a href="#" className="card-link">
//   Another link
// </a>
