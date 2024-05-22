import React from "react";

const EditNoteForm = ({ note, setNote }) => {

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log("onchange : ", note);
  };

  return (
    <div className="container my-3">
      {/* <h3>Add a Note</h3> */}
      <form>
        <div className="mb-3">
          <label htmlFor="edit-note-title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="edit-note-title"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edit-note-description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edit-note-description"
            name="description"
            value={note.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edit-note-tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="edit-note-tag"
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
        {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button> */}
      </form>
    </div>
  );
};

export default EditNoteForm;
