import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdCloudUpload, MdLiveTv } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { LuCircleUserRound } from "react-icons/lu";
import "../style/Footer.css"; 
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider"; 
import Broadcast from "./Broadcasts.jsx";  
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const { isBroadcasting, broadcastId, startBroadcast, handleEndBroadcast } = useContext(AuthenticationContext);
  const handleGolive = () => {
    startBroadcast();
    navigate("/live");
  };
  return (
    <footer className="footer">
      <div className="footer-column">
       
        <div className="ico">
          <button className="footer-button">
            <Link to="/upload">
              <MdCloudUpload />
            </Link>
          </button>
          <span>Upload</span>
        </div>

      
        <div className="ico">
          <button className="footer-button">
            <SiYoutubeshorts />
          </button>
          <span>Shorts</span>
        </div>

       
        <div className="ico">
          <button
            className="footer-button"
            onClick={handleGolive}
          >
            <MdLiveTv />
          </button>
          <span>Go live</span>
        </div>

       
        <div className="ico">
          <button className="footer-button">
            <Link to="/login">
              <LuCircleUserRound />
            </Link>
          </button>
          <span>Profile</span>
        </div>
      </div>  
      
    </footer>
  );
};

export default Footer;
