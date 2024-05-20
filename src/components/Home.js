import React,{useContext} from "react";
import NoteContext from '../context/notes/NoteContext';
const Home = () => {
  // console.log(NoteContext);
  const a  = useContext(NoteContext)
  // console.log("context",context)
  // const {notes } = a;

  // console.log(notes)
  return (
    <div>
      <div className="container my-3">
        <h3>Add a Note</h3>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {/* <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div> */}
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="container my-3">
        <h3>Your Notes</h3>

        {/* {a.notes.map((note)=>{
          return note.title;
        })

        } */}
      </div>
    </div>
  );
};

export default Home;