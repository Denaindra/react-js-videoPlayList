import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import "./videoPlayer.css";
import "./videobuttonSets.css";
import "./replayIconSets.css";

import { GetVideoListItems } from "../helperFunction/filehandler";

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(true); // play and pause the video
  const playerRef = useRef(null); // replay 
  const [videoArray, setVideoArray] = useState([]); // play and pause the video
  const videoIndex = useRef(0);  // keep the video index

  useEffect(() => {
    console.log("app loaded")
    // Disable scrolling when the component is mounted
    document.body.style.overflow = "hidden";
    async function fetchMeetings() {
      try {
         var videoCollection = await GetVideoListItems();
         setVideoArray(videoCollection);
      } 
      catch (err) {
        console.log("onError [GetVideoListItems] ", err)
      } 
    }
    return () => {
      // Enable scrolling when the component is unmounted
      document.body.style.overflow = "auto";
      fetchMeetings();
    };
  }, []);

  const onProgressHandler = (progress) => {
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

    if (progress.playedSeconds > videoArray[videoIndex.current].pauseIndex) {
      // 6s is the place that questions is comming
      setPlaying(false);
    }
  };
 const replayVideo = () =>{
   setPlaying(false); // Set playing state to false when paused
    playerRef.current.seekTo(0); // Seek to the start
    setPlaying(true); // Set playing state back to true to replay
 }

 
  return (
    <div>
      {(videoArray !== "undefined") & (videoArray.length > 0) ? (
        <>
          <ReactPlayer
            url={"assets/videoAssets/" + videoArray[videoIndex.current].videoId}
            ref={playerRef}
            controls={false}
            height="100vh"
            width="100vw"
            className="react-player"
            playing={playing} //deafult it's false
            muted={true}
            onError={(e) => console.log("onError [ReactPlayer]", e)}
            onProgress={onProgressHandler}
          />
          <div className="replay-container">
            <button className="replay-icon-button" onClick={replayVideo}>
              <img src="assets/images/replayvid.png" alt="icon" className="icon-img" />
              <span className="button-text">Replay</span>
            </button>
          </div>

          <div
            style={{
              display: "flex",
              backgroundImage: "linear-gradient(#000000D8, transparent)",
              flexDirection: "column",
              position: "absolute",
              bottom: "10vh",
              left: 0,
              right: 0,
            }}
          >
            <p
              style={{
                fontWeight: "700",
                textAlign: "center",
                padding: "0px 5px 0px 5px",
                color: "white",
              }}
            >
              {videoArray[videoIndex.current].question}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "10%",
              }}
            >
              <button type="button" className="btn btn-2 btn-2b">
                {videoArray[videoIndex.current].yes}
              </button>
              <button type="button" className="btn btn-2 btn-2b">
                {videoArray[videoIndex.current].no}
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p> // Handle case where data is not yet available}
      )}
    </div>
  );
}
