import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer() {
    const handleProgress = (progress) => {
        console.log('Played: ', progress.played , ' Played Seconds:', progress.playedSeconds, ' Loaded Seconds:', progress.loadedSeconds); // Percentage of video played
      };

  return (
    <div>VideoPlayer12
        <ReactPlayer 
      url={'assets/Download.mp4'}
      controls={false}
      height="60%"
      width="10%"
      playing={true}
      muted = {true}
      onError={e => console.log('onError [ReactPlayer]', e)}
      onProgress={handleProgress}
    />
    </div>
  )
}
