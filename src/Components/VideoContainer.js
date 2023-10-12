import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from './contants'
import Video from './Video'
import "../Components/Video.css"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sidebarshow,sidebarshowwindow } from '../utils/YoutubeSlice'
import { isShow } from '../utils/YoutubeSlice'

const VideoContainer = () => {
    
    const [videos,setVideos] = useState([]);
    const [pageToken, setPageToken] = useState('');

    useEffect(()=>{
        getVideos()
       // console.log(videos);
    },[])

    const getVideos = async() =>{
        //const datafile = await fetch(YOUTUBE_VIDEO_API)
        const datafile = await fetch(`${YOUTUBE_VIDEO_API}&pageToken=${pageToken}`);
        const jsonfile = await datafile.json()
        //console.log(jsonfile);
        setVideos(jsonfile.items);

       setPageToken(jsonfile.nextPageToken);
    }
   
    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          getVideos();
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [ window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight]);

      const dispatch = useDispatch()
     useEffect(()=>{
      const windowsize = () => {
        console.log(window.innerWidth);
        if(window.innerWidth <= 500){
          dispatch(sidebarshow())
      
        }
        else{
          dispatch(sidebarshowwindow())
        }
      }
    
      window.addEventListener('resize',windowsize)
    
      return () => {
        window.removeEventListener('resize',windowsize)
      }
    
     },[window.innerWidth])
     
     useEffect(() => {
      if(window.innerWidth < 500){
        dispatch(sidebarshow())
      }
     },[])

  return (
    <div className='video-container'>
    
           {
            videos.map((value,index) =>(
                <div key={index}>
                  <Video video={value} />
                </div>
            )
            
            )
        }
    
    </div>
  )
}

export default VideoContainer
