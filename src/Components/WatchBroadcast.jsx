import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider.jsx";
import Hls from "hls.js";

const WatchBroadcast = () => {
  const { broadcastId } = useParams(); // Get broadcastId from the URL
  const { token } = useContext(AuthenticationContext);
  const [streamUrl, setStreamUrl] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const joinBroadcast = async () => {
      try {
        // Join the broadcast
        await fetch("http://localhost:8080/broadcast/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ broadcastId }),
        });

        // Fetch the stream URL (replace with your actual logic)
        const response = await fetch(`http://localhost:8080/broadcast/stream/${broadcastId}`);
        const data = await response.json();
        setStreamUrl(data.streamUrl);
      } catch (error) {
        console.error("Error joining broadcast:", error);
      }
    };

    joinBroadcast();
  }, [broadcastId, token]);

  useEffect(() => {
    if (streamUrl && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support (e.g., Safari)
        videoRef.current.src = streamUrl;
      }
    }
  }, [streamUrl]);

  return (
    <div className="watch-broadcast">
      <h2>Watching Broadcast: {broadcastId}</h2>
      {streamUrl ? (
        <video ref={videoRef} controls autoPlay />
      ) : (
        <p>Loading stream...</p>
      )}
    </div>
  );
};

export default WatchBroadcast;