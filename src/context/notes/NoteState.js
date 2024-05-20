import React, { useState }  from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const intialNotes = [
      {
        "_id": "6646d357b321ae0db4e1c257",
        "user": "6645dafa880352691e06b782",
        "title": "test 1",
        "description": "hdgbjsisduhcnsjdvbndkcvjhvndcjv",
        "tag": "General",
        "date": "2024-05-17T03:47:35.634Z",
        "__v": 0
      },
      {
        "_id": "6646d42ec878ba512de3a414",
        "user": "6645dafa880352691e06b782",
        "title": "test 1",
        "description": "hdgbjsisduhcnsjdvbndkcvjhvndcjv",
        "tag": "General",
        "date": "2024-05-17T03:51:10.144Z",
        "__v": 0
      },
      {
        "_id": "6646d42ec878ba512de3a416",
        "user": "6645dafa880352691e06b782",
        "title": "test 1",
        "description": "hdgbjsisduhcnsjdvbndkcvjhvndcjv",
        "tag": "General",
        "date": "2024-05-17T03:51:10.921Z",
        "__v": 0
      },
      {
        "_id": "6646d42fc878ba512de3a418",
        "user": "6645dafa880352691e06b782",
        "title": "test 1",
        "description": "hdgbjsisduhcnsjdvbndkcvjhvndcjv",
        "tag": "General",
        "date": "2024-05-17T03:51:11.924Z",
        "__v": 0
      }
    ]

    const {notes , setNotes} = useState(intialNotes);

    
  return (
    <NoteContext.Provider value={{notes,setNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
