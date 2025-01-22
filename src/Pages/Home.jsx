import React, { useContext, useEffect, useReducer,useState } from "react";
import { homeReducer, homeInitState, getHomePageData } from "../API/fetchData";
import Cards from "../Components/Cards";
import "../style/Home.css";
import SideLinks from "../Components/SideLinks";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import { BsMenuUp } from "react-icons/bs";

export default function Home() {
  const { setQuery } = useContext(AuthenticationContext);
  const [state, dispatch] = useReducer(homeReducer, homeInitState);
  // const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    getHomePageData(dispatch);
    setQuery("");
  }, []);

  // const toggleSideLinks = () => {
  //   setIsOpen(!isOpen);
  // };

  if (state.loading) {
    return (
      <div className="loading-data">
        <img
          src="https://media.tenor.com/wpSo-8CrXqUAAAAj/loading-loading-forever.gif"
          alt="Loading data..."
        />
      </div>
    );
  }

  return (
    <div className="home">
     <div className="side">
      <SideLinks />
     </div>
      <div className="videos">
        {state.data.map((video) => (
          <Cards {...video} key={video._id} target="videos" />
        ))}
      </div>
    </div>
  );
} 
