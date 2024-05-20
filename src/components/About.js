import React,{ useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';

const About = ()=>{
    const {notes}  = useContext(NoteContext)
    console.log(notes);
    return (
        <div>
            <h1> This is about {notes} and </h1>
        </div>
    );
}


export default About;