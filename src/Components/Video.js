import React from 'react'
import "../Components/Video.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { historyvideos } from '../utils/YoutubeSlice';
import { UseSelector } from 'react-redux/es/hooks/useSelector';

const Video = ({video}) => {

  const dispatch = useDispatch()

  const history = () => {
     dispatch(historyvideos(video))
  }
    
  return (
    <div className='video-card'>
     <Link to={"/watch?v=" + video.id} className='text-decoration'> <img src={video?.snippet?.thumbnails?.medium?.url} className='video-img'
     onClick={history}
     /></Link>
      <b className='title'>{video?.snippet?.title}</b>
    <Link to={"/channel/" + video?.snippet.channelId} className='text-decoration'>
    <div className='account-circle'>
       <AccountCircleIcon /> <h4 className='channel'>{video?.snippet?.channelTitle}</h4>
       </div>
      <p className='views'>Views:{video?.statistics?.viewCount}</p>
    </Link>
    </div>
  )
}

export default Video
