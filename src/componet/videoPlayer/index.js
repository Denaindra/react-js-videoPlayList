import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./videoPlayer.css";

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(true); // play and pause the video

  useEffect(() => {
    // Disable scrolling when the component is mounted
    document.body.style.overflow = "hidden";
    return () => {
      // Enable scrolling when the component is unmounted
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleProgress = (progress) => {
    console.log(
      "IsPlaying: ",
      playing,
      " Played: ",
      progress.played,
      " Played Seconds:",
      progress.playedSeconds,
      " Loaded Seconds:",
      progress.loadedSeconds
    ); // Percentage of video played

    if (progress.playedSeconds > 1.4) {
      // 6s is the place that questions is comming
      setPlaying(false);
    }
  };

  return (
    <div> 
        <ReactPlayer
          url={"assets/videoAssets/0921.mov"}
          controls={true}
          height="100vh"
          width="100vw"
          className="react-player" 
          playing={playing} //deafult it's false
          muted={true}
          onError={(e) => console.log("onError [ReactPlayer]", e)}
          onProgress={handleProgress}
        />
    </div>
  );
}
