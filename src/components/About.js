import React,{ useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';

const About = ()=>{
    const a  = useContext(NoteContext)

    useEffect
    return (
        <div>
            <h1> This is about {a.state.notes} and he is {a.state.class}</h1>
        </div>
    );
}


export default About;