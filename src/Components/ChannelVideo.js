import React from 'react'
import "../Components/Video.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const ChannelVideo = ({video}) => {
  return (
    <div className='video-card'>
      
    <Link to={"/watch?v=" + video.id.videoId} className='text-decoration'> <img src={video?.snippet?.thumbnails?.medium?.url} className='video-img'/></Link>
     <b className='title'>{video?.snippet?.title}</b>
   <Link to={"/channel/" + video?.snippet.channelId} className='text-decoration'>
   <div className='account-circle'>
      
      </div>
    {video?.statistics?.viewCount > 0 ? <p className='views'>Views:{video?.statistics?.viewCount}</p> : null} 
   </Link>
   </div>
  )
}

export default ChannelVideo
