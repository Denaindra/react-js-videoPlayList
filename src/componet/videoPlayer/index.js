import React, { useState } from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer() {
    const [playing, setPlaying] = useState(true); // play and pause the video


    const handleProgress = (progress) => {
        console.log('IsPlaying: ',playing,' Played: ', progress.played , ' Played Seconds:', progress.playedSeconds, ' Loaded Seconds:', progress.loadedSeconds); // Percentage of video played
       
        if(progress.playedSeconds > 1.4 ){ // 6s is the place that questions is comming
         setPlaying(false)
       }  
    };

  return (
    <div>VideoPlayer12
        <ReactPlayer 
      url={'assets/videoAssets/0921.mov'}
      controls={true}
      height="60%"
      width="10%"
      playing={playing} //deafult it's false
      muted = {true}
      onError={e => console.log('onError [ReactPlayer]', e)}
      onProgress={handleProgress}
    />
    </div>
  )
}
