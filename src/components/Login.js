import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

const Login = () => {
  const {showAlert } = useContext(NoteContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  };

  const handleSUbmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email , password:credentials.password}) // body data type must match "Content-Type" header
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
      // save the auth-token in local storage and redirect
      console.log("login successful and redirected")
      localStorage.setItem("authToken" , json.authToken);
      navigate("/")
      // login success - alert
      // fetchUserDetails();
      showAlert("Login successful","success");
    }
    else{
      // alert("please enter a valid credentials");
      showAlert("Please enter a valid credentials","warning");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSUbmit}>
        <h3 className="my-2">Login</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
