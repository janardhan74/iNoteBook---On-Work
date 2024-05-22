import React, { useState, useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import EditNoteForm from "./EditNoteForm";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const { notes, fetchAllNotes, editNote , showAlert } = useContext(NoteContext);
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const ref = useRef(null);
  // console.log("notes ",notes)
  useEffect(() => {
    if(localStorage.getItem("authToken")){
      fetchAllNotes();
    }
    else{
      navigate("/login");
    }
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote);
    
  };

  const handleClickEditForm = async () => {
    await editNote(note._id, note.title, note.description, note.tag);
    await showAlert("Succesfully updated notes","success");
  };

  return (
    <div className="row mx-auto">
      {/* model start */}
      <button
        style={{ display: "none" }}
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditNoteForm note={note} setNote={setNote} />
            </div>
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleClickEditForm}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal end  */}

      <AddNote />
      <h3>Your Notes</h3>
      {notes &&
        notes.map((note) => {
          // console.log(note);
          return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
    </div>
  );
};

export default Notes;
