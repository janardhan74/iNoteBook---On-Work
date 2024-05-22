import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

const Navbar = () => {
  const { details, setDetails } = useContext(NoteContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    setDetails(null);
  };

  return (
    <div>
      {/* <Router> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <p className="nav-item my-0 mx-4" style={{ color: "white" }}>
                {details && details.name}
              </p>
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link
                    className="btn btn-primary mx-1"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-primary mx-1"
                    to="/signup"
                    role="button"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <button className="btn btn-primary mx-1" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* </Router> */}
    </div>
  );
};

export default Navbar;
