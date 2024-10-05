import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import "./videoPlayer.css";
import "./videobuttonSets.css";
import "./replayIconSets.css";
import "./animation.css";
import { GetVideoListItems } from "../helperFunction/filehandler";
import { CSSTransition } from 'react-transition-group';

export default function VideoPlayer() {
  const palyFlag = useRef(true);  // keep the paying video
  const playerRef = useRef(null); // replay 
  const startPlayButton = useRef(true); // replay 
  const [playing, setPlaying] = useState(false); // play and pause the video
  const [videoArray, setVideoArray] = useState([]); // play and pause the video
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(true);
  const nodeRef = useRef(null); // Ref for the player container inside CSSTransition
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
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
    // console.log(
    //   "IsPlaying: ",
    //   playing,
    //   " Played: ",
    //   progress.played,
    //   " Played Seconds:",
    //   progress.playedSeconds,
    //   " Loaded Seconds:",
    //   progress.loadedSeconds
    // ); // Percentage of video played

    if(palyFlag.current) {
      pauseVideoForDisplayQuestion(progress.playedSeconds)
    }
  };
  
const pauseVideoForDisplayQuestion = (playedSeconds) =>{
  const currentTimeInMilliseconds = playedSeconds * 1000;
  if (currentTimeInMilliseconds >= (videoArray[currentVideoIndex].pauseIndex * 1000)) {
      // 6s is the place that questions is comming
      setPlaying(false);
      palyFlag.current = false;
      console.log("video pause");
      setShowInputs(true);
    }
}


 const replayVideo = () =>{
   palyFlag.current = true;
   //setPlaying(false); // Set playing state to false when paused
    playerRef.current.seekTo(0); // Seek to the start
    setPlaying(true); // Set playing state back to true to replay
 }

 const onEnded = () => {
   setShowPlayer(false);
   palyFlag.current = true;
   if (currentVideoIndex === videoArray.length - 1) {
     setShowPlayer(true);
     setPlaying(false);
   } else {
     setTimeout(() => {
       setShowPlayer(true); // Trigger enter animation
     }, 500); // Matches the duration of the exit animation
     setCurrentVideoIndex((prevIndex) => prevIndex + 1);
   }
 };

  const startPlay = () => {
    startPlayButton.current = false;
    setPlaying(true);
  }

const videoControlBtnClick = (id) =>{
  setShowInputs(false);
 if(id === videoArray[currentVideoIndex].correctAnzwer) {
  //alert("it's correct !!")
 }else{
  //alert("it's not correct !!")
 }
 setPlaying(true);
}
 
  return (
    <div className="video-container" style={{backgroundColor:"black"}} >
       <CSSTransition
        in={showPlayer}
        timeout={500}
        nodeRef={nodeRef}
        classNames="video-slide"
        unmountOnExit
      >
        <div ref={nodeRef}>
      {(videoArray !== "undefined") & (videoArray.length > 0) ? (
        <>
          <ReactPlayer
            url={"assets/videoAssets/" + videoArray[currentVideoIndex].videoId}
            ref={playerRef}
            controls={false}
            height="100vh"
            width="100vw"
            className="react-player"
            playing={playing} //deafult it's false
            muted={false}
            onError={(e) => console.log("onError [ReactPlayer]", e)}
            onProgress={onProgressHandler}
            progressInterval={100}
            playsinline={true}
            onEnded={onEnded}
          />
           <div className="score-Results">
              <label>Score 230</label>
          </div>
  {showInputs && (
          <div className="replay-container animate-slide-in">
            <button className="replay-icon-button" onClick={replayVideo}>
              <img src="assets/images/replayvid.png" alt="icon" className="icon-img" />
              <span className="button-text">Replay</span>
            </button>
          </div>
  )}
          {startPlayButton.current &&
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "50%",
              }}
            >
              <button onClick={() => startPlay()} type="button" className="btn btn-2 btn-2b">
                START PLAY
              </button>
            </div>
          }
         {showInputs && ( 
          <div className="questionSection animate-slide-bottom2Top">
            <p
              style={{
                fontWeight: "700",
                textAlign: "center",
                padding: "0px 5px 0px 5px",
                color: "white",
              }}
            >
              {videoArray[currentVideoIndex].question}
            </p>
            <div className="buttonSection">
              <button onClick={() => videoControlBtnClick(1)} type="button" className="btn btn-2 btn-2b">
                {videoArray[currentVideoIndex].yes}
              </button>
              <button onClick={() => videoControlBtnClick(2)} type="button" className="btn btn-2 btn-2b">
                {videoArray[currentVideoIndex].no}
              </button>
            </div>
          </div>
        )}
        </>
      ) : (
        <p>Loading...</p> // Handle case where data is not yet available}
      )}
       </div>
       </CSSTransition>
    </div>
  );
}
