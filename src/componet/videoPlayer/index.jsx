import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./videoPlayer.css";
import "./videobuttonSets.css";
import { GetMeetingList } from "../helperFunction/filehandler";

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(true); // play and pause the video

  useEffect(() => {
    // Disable scrolling when the component is mounted
    document.body.style.overflow = "hidden";
    async function fetchMeetings() {
      try {
        var results = await GetMeetingList();
        console.log("test 123",results);
      } 
      catch (err) {

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
        onProgress={onProgressHandler}
      />
      <div
        style={{
          display: "flex",
          backgroundImage: "linear-gradient(#000000D8, transparent)",
          flexDirection: "column",
          position: "absolute",
          bottom: "15vh",
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
          Hmmm Virate kole gone now with buha buha buha _______{" "}
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
            Witcket
          </button>
          <button type="button" className="btn btn-2 btn-2b">
            Catch
          </button>
        </div>
      </div>
    </div>
  );
}
