import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Alert = () => {
  const {alert} = useContext(NoteContext);
  // alert types
  // primary - blue
  // secondary - gary
  // success - green
  // danger - red
  // warning - yellow
  // info - aqua
  // light - white
  // dark - black
  return (
    <div style={{height:"50px"}}>
    {alert && 
    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
      <strong>{alert.type}</strong> {alert.message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>}
    </div>
  );
};

export default Alert;
