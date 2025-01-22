import React, { useContext } from "react";
import "../style/Logout.css"; 
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";

const LogoutComponent = () => {
  const { email, setEmail, name, setName, setIsAuthorized } = useContext(AuthenticationContext);
  const fullName = name.split(" ");
  return (
    <div className="logout-div">
      <div className="user-info">
        <div className="avatar" title="User Initials">
          {fullName.length > 1 ? fullName[0][0] + fullName[1][0] : "?"}
        </div>
        <div className="user-name">{name}</div>
      </div>

      <hr className="divider" />

      <div className="signed-in">
        Signed In as: <strong>{email}</strong>
      </div>
      <button
        className="logout-button"
        onClick={() => {
          setIsAuthorized(false);
          setName("");
          setEmail("");
        }}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default LogoutComponent;
