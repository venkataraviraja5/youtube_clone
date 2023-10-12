import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../Components/Watchpage.css"
import { Link } from 'react-router-dom';

const ChannelWatchpage = ({video}) => {
  return (
    <div>
    <div className='sugg-video'>
       <div>
       <Link to={"/watch?v=" + video.id.videoId} className='text-line'> <img src={video?.snippet?.thumbnails?.medium?.url} className='sugg-img' /></Link>
       </div>
      <div style={{marginLeft:"5px"}}>
      <b className='title'>{video?.snippet?.title}</b>
       <div className='account-circle'>
       <AccountCircleIcon /> <h4 className='channel'>{video?.snippet?.channelTitle}</h4>
       </div>
      <p className='views'>Views:{video?.statistics?.viewCount}</p>
      </div>
    </div>
    </div>
  )
}

export default ChannelWatchpage
