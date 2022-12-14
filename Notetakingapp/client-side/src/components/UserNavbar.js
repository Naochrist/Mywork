import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar//Navbar.css";
import { IoMdRocket } from "react-icons/io";

const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);
  const navHandler = () => {
    setNavToggle((prevData) => !prevData);
  };

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  function logout(){
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <nav className="navbar w-100 flex">
      <div className="container w-100">
        <div className="navbar-content flex fw-7">
          <div className="brand-and-toggler flex flex-between w-100">
            <Link to="/" className="navbar-brand fs-26">
              NoteMe
            </Link>
            <div
              type="button"
              className={`hamburger-menu ${
                navToggle ? "hamburger-menu-change" : ""
              }`}
              onClick={navHandler}
            >
              <div className="bar-top"></div>
              <div className="bar-middle"></div>
              <div className="bar-bottom"></div>
            </div>
          </div>

          <div
            className={`navbar-collapse ${
              navToggle ? "show-navbar-collapse" : ""
            }`}
          >
            <div className="navbar-collapse-content">
              <ul className="navbar-nav">
                <li className="text-white">
                  <Link to="/">Home</Link>
                </li>
                <li className="text-white">
                  <Link to="/">About</Link>
                </li>

                <li className="text-white">
                  <button onClick={logout}>LogOut</button>
                </li>
              </ul>

              <div className="navbar-btns">
                <button
                  onClick={navigateToRegister}
                  type="button"
                  className="btn"
                >
                  <IoMdRocket /> <span>get started</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

