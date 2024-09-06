import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { CSSTransition } from 'react-transition-group';
import './VideoPlayer.css';


const videoList = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
];

export default function VideoPlayer() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(true);

  // Handle video end event
  const handleVideoEnd = () => {
    setShowPlayer(false); // Trigger exit animation

    // Wait for animation to finish (500ms) and switch video
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === videoList.length - 1 ? 0 : prevIndex + 1
      );
      setShowPlayer(true); // Trigger enter animation
    }, 500); // Matches the duration of the exit animation
  };

  return (
    <div className="video-container">
      <CSSTransition
        in={showPlayer}
        timeout={500}
        classNames="video-slide"
        unmountOnExit
      >
        <ReactPlayer
          url={videoList[currentVideoIndex]}
          controls={true}
          playing={true}
          width="100%"
          height="100vh"
          onEnded={handleVideoEnd}
        />
      </CSSTransition>
    </div>
  );
}
