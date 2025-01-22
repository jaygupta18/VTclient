import React, { useContext, useState } from "react";
import "../style/Navbar.css";  
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMicOutline } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import { LuBellRing } from "react-icons/lu";
import { LuCircleUserRound } from "react-icons/lu";
import DrawerComponent from "./DrawerComponent";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";

export default function Navbar() {
  const { query, setQuery } = useContext(AuthenticationContext);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
                        
  return (
    <div className="navbar">
      <div className="sidenav">
        <DrawerComponent />
        <Link to="/">
          <img
            className="logo"
            src="/assets/logo.png"
            alt="Logo"
          /> 
        </Link>
      </div>  
      <div className="search-bar">
        <div className="input-group">
          <input
            className="search-input"
            onChange={handleChange}
            type="text"
            placeholder="Search"
            value={query}
          />
          <Link className="search-icon" to={`search/${query}`}>
            < BsSearch/>
          </Link>
        </div>
        <button className="mic-button">
          <IoMicOutline/>
        </button>
      </div>

      <div className="actions">
        <div className="first">
        <button className="action-button">
          <Link to="/upload"><MdCloudUpload/></Link>
        </button>
        <button className="action-button"><LuBellRing/></button>
        <button className="action-button">
          <Link to="/login"><LuCircleUserRound/></Link>
        </button> 
        </div>
        <div className="second">
        <button className="second-button">
          <Link to="/upload"><MdCloudUpload/></Link>
        </button>
        <button className="second-button"><LuBellRing/></button>
        <button className="second-button">
          <Link to="/login"><LuCircleUserRound/></Link>
        </button> 
        </div>
      </div>
    </div>
  );
}       
                            