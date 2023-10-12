import React from 'react'
import "../Components/Video.css"
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchhistory } from '../utils/YoutubeSlice'

const WatchSearch = ({video}) => {
  const dispatch = useDispatch()

  const history = () => {
    if(video?.id?.videoId != undefined){
     dispatch(searchhistory(video))
    }
  }
  console.log(video?.id?.videoId);
  return (
 <div>
  {
              video?.id?.videoId != undefined ? 
                <div className='video-card'>
                <Link to={"/watch?v=" + video?.id?.videoId} className='text-decoration'> <img src={video?.snippet?.thumbnails?.medium?.url} className='video-img'
                onClick={history}
                /></Link>
                 <b className='title'>{video?.snippet?.title}</b>
               <Link to={"/channel/" + video?.snippet?.channelId} className='text-decoration'>
               <div className='account-circle'>
                  <AccountCircle /> <h4 className='channel'>{video?.snippet?.channelTitle}</h4>
                  </div>
                 <p className='views'>Views:{video?.statistics?.viewCount}</p>
               </Link>
               </div>:null
  }
 </div>
  )
}

export default WatchSearch

