import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../Components/Watchpage.css"
import { Link } from 'react-router-dom';

const WatchVideos = ({video}) => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className='sugg-video'>
       <div>
       <Link to={"/watch?v=" + video.id} className='text-line'> <img src={video?.snippet?.thumbnails?.medium?.url} className='sugg-img' 
       onClick={scrollToTop}
       /></Link>
       </div>
      <div style={{marginLeft:"5px"}}>
      <b className='title'>{video?.snippet?.title}</b>
       <div className='account-circle'>
       <AccountCircleIcon /> <h4 className='channel'>{video?.snippet?.channelTitle}</h4>
       </div>
      <p className='views'>Views:{video?.statistics?.viewCount}</p>
      </div>
    </div>
  )
}

export default WatchVideos
