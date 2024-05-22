import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const { addNote , showAlert } = useContext(NoteContext);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    await e.preventDefault();
    // console.log("title ",note);
    await addNote(note.title, note.description, note.tag);
    await setNote({ title: "", description: "", tag: "" });
    await showAlert("Successfully added note","success");
  };

  return (
    <div className="container my-3">
      <h3>Add a Note</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="note-title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="note-title"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="note-description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="note-description"
            name="description"
            value={note.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="note-tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="note-tag"
            name="tag"
            value={note.tag}
            onChange={handleChange}
          />
        </div>
        {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
