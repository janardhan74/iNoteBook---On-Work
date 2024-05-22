import React, { useState } from "react";
import NoteContext from "./NoteContext";

const host = "http://localhost:3000/"

const NoteState = (props) => {
  // let intialNotes = [];
  // console.log("hi")

  const [notes, setNotes] = useState([]);
  const [details , setDetails] = useState(null);

  // get all details
  const fetchUserDetails = async ()=>{
    // API Call
    // console.log("notes fetched")
    const response = await fetch(`${host}api/auth/getuser`,{
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("authToken")
      },
    });

    // console.log(response.json().Array())
    const json = await response.json()
    setDetails(json);
  }

  // fetch all notes
  const fetchAllNotes = async ()=>{
    // API Call
    console.log("notes fetched")
    const response = await fetch(`${host}api/notes/fetchallnotes`,{
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("authToken")
      },
    })
    // console.log(response.json().Array())
    const json = await response.json()
    console.log("in fetchallnotes " , json);
    setNotes(json);

    fetchUserDetails();
  }


  // add a Note
  const addNote = async (title, description, tag) => {
    // TODO : API call
    const response = await fetch(`${host}api/notes/addnote/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("authToken")
      },
      body: JSON.stringify({title , description , tag}), // body data type must match "Content-Type" header
    });

    
    const newNote = await response.json(); // created note

    // console.log("det:  ", title, description, tag);

    setNotes(notes.concat(newNote));

  };

  // delete a note
  const deleteNote = async (id) => {
    // TODO : API call
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("authToken")
      }
    });

    
    
    console.log("delete Note : ", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);

    return response.json(); // deleted note
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // TODO : API call

    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("authToken")
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header

    });


    const updatedJson = await response.json(); // updated note

    console.log(updatedJson);
    
    // for (let ind = 0; ind < notes.length; ind++) {
    //   let element = notes[ind];
    //   if(element._id === id){
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //   }
    // }

    await fetchAllNotes()

  };

  const [alert , setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  return (
    <NoteContext.Provider value={{ notes , fetchAllNotes, addNote, deleteNote, editNote , alert , showAlert , details , setDetails }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
