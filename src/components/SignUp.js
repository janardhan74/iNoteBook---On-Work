
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

const SignUp = () => {
  const {showAlert } = useContext(NoteContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      alert("password and cofirm password should match");
      return;
    }
    // console.log(credentials)
    const response = await fetch(`http://localhost:3000/api/auth/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      }), // body data type must match "Content-Type" header
    });


    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
      // fetchUserDetails();
      showAlert("Succesfully created account","success")
    }
    else{
      // alert("signup failed")
      showAlert("SignUp failed-Please enter a valid credentials","")
    }

  };
  return (
    <div className="container">
      <h3 className="my-2">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="signup-name" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="signup-name"
            aria-describedby="emailHelp"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signup-email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="signup-email"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signup-password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="signup-password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signup-conform-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="text"
            className="form-control"
            id="signup-conform-password"
            name="confirmPassword"
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

export default SignUp;
