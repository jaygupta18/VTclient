// src/pages/LiveStream.js
import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import SimplePeer from "simple-peer";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import "../style/LiveStream.css";

const socket = io("http://localhost:8080");

const Broadcast = () => {
  const { broadcastId, setBroadcastId, setIsBroadcasting, endBroadcast } = useContext(AuthenticationContext);
  const [stream, setStream] = useState(null);
  const userVideoRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }

      socket.emit("joinBroadcast", broadcastId);
    });

    return () => {
      socket.emit("leaveBroadcast", broadcastId);
      stream?.getTracks().forEach((track) => track.stop());
      endBroadcast();
    };
  }, [broadcastId]);

  const handleEndLive = () => {
    endBroadcast();
    navigate("/");
  };

  return (
    <div className="live-stream-container">
      <h1>Live Streaming</h1>
      <video ref={userVideoRef} autoPlay muted controls className="live-video" />
      <button className="end-live-button" onClick={handleEndLive}>End Live</button>
    </div>
  );
};

export default Broadcast;