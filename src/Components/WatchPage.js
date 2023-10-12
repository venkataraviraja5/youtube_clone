import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useStore } from 'react-redux';
import { sidebarshow,addsubscribe } from '../utils/YoutubeSlice';
import "../Components/Watchpage.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { YOUTUBE_VIDEO_API } from './contants';
import WatchVideos from './WatchVideos';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { likedthumbnails,historyvideos,unsubscribe} from '../utils/YoutubeSlice';

const WatchPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch()
    const [comments,setcomments] = useState([])
    const [videos,setVideos] = useState([]);
    const [pageToken, setPageToken] = useState('');
    const [videoinfo,setvideoinfo] = useState("")
    const [videoid,setvideoid] = useState("")
    //console.log(searchParams.get("v"));
   
    //console.log(subscribechannel);
  

    useEffect(()=>{

       const windowsize = () => {
        if(!window.innerWidth ){
          dispatch(sidebarshow())
        }
       }      
        window.addEventListener('resize',windowsize)

        return () => {
          window.removeEventListener('resize',windowsize)
        }
    },[window.innerWidth])

    useEffect(()=>{
      dispatch(sidebarshow())
    },[])
 
   const commentsAPI = async() => {
      const url = await fetch (`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${searchParams.get("v")}&key=AIzaSyAuz27CUz0uGoI9pQxb_eiqLbjPAr07YjQ`)
      const jsonfile = await url.json()
     // console.log(jsonfile.items);
      setcomments(jsonfile.items)
   }

   useEffect(()=>{
    commentsAPI()
    videoID()
   },[searchParams.get("v"),])

     useEffect(()=>{
      videoID()
      },[videoid])

   useEffect(()=>{
       getVideos()
   },[])

   const getVideos = async() =>{
       //const datafile = await fetch(YOUTUBE_VIDEO_API)
       const datafile = await fetch(`${YOUTUBE_VIDEO_API}&pageToken=${pageToken}`);
       const jsonfile = await datafile.json()
       //console.log(jsonfile);
       setVideos((prevVideos) => [...prevVideos, ...jsonfile.items]);

      // Update the page token for the next page
      setPageToken(jsonfile.nextPageToken);
   }
   const videoID = async() =>{
    const url = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${searchParams.get("v")}&key=AIzaSyAuz27CUz0uGoI9pQxb_eiqLbjPAr07YjQ`);
    const jsonfile = await url.json();
    //console.log(jsonfile);
    setvideoinfo(jsonfile.items)
    setvideoid(jsonfile.items[0]?.id)
   }

   const subscribechannel = useSelector((store) => store.app.subscribe)

   let subchannel = false
    
   subscribechannel.map((value) => {
    value.map(video => {
        if(video?.snippet?.channelId === videoinfo[0]?.snippet?.channelId){
          subchannel = true
        }
        else{
          subchannel = false
        }
    })
   })

  

   const addsub = () => {
    if(subchannel === true){}
    else{
      dispatch(addsubscribe(videoinfo))
    }
   }

   const unsub = () => {
    dispatch(unsubscribe(videoinfo[0]?.snippet?.channelId))
   }
  
   const likedvideothumbnail = useSelector((store) => store.app.thumbnails)

   let like = false

   likedvideothumbnail.map((value) => {
    value.map(video => {
        if(video.id === searchParams.get("v")){
          like = true
        }
        else{
          like = false
        }
    })
   })

  // console.log(thumbnail);

   const likedvideos = () => {
      if(like === true){}
      else{
        dispatch(likedthumbnails(videoinfo))
      }
   }

   
  return (
    <div className='watchpage-main'>
       <div className='watchpage-left'>
       <iframe
      src={`https://www.youtube.com/embed/${searchParams.get("v")}?autoplay=1`}
      title="YouTube video player"
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowFullScreen
       className='iframe'>
      </iframe>
      {
          comments === undefined ? <div> <h1>Video Unavailable</h1> </div> : <div>
      
      <div>
      <p>{videoinfo[0]?.snippet?.title}</p>
      </div>
      <div className='video-info'>
        <div style={{display:"flex",marginTop:"20px"}}>
        <Link to={"/channel/" + videoinfo[0]?.snippet?.channelId} className='watchpage-text'> <AccountCircleIcon  />
        <p className='title'>{videoinfo[0]?.snippet?.channelTitle}</p>
        </Link>
        </div>
       
          {subchannel ? <p className='subscribe' onClick={unsub}>Unsubscribe</p> :  <p className='subscribevideo' onClick={addsub}>Subscribe</p>}
       <div className='like-btn'>
       <img src='https://img.icons8.com/?size=1x&id=24816&format=png' className='thumbsup' onClick={likedvideos}/>
        <img src='https://img.icons8.com/?size=1x&id=2913&format=png' className='thumbsdown' />
       </div>
      </div>
      <div className='black-line'></div>
      <h1 className='comments'>Comments</h1>
      </div>
}
      <div className='watch-line'></div>
        {
          comments != undefined ?  <div> {
            comments.map((value,index) => (
              <div className='comments'>
              <p key={index}><AccountCircleIcon />{value?.snippet?.topLevelComment?.snippet?.textDisplay}</p>
              <div className='watch-line'></div>
              </div>
            ))
          }</div>:<h2>No Comments</h2>
        }
       </div>
       <div  className='watchpage-right'>
       {
            videos.map((value,index) =>(
                <div key={index}>
                  <WatchVideos video={value} />
                </div>
            )
            
            )
        }
       </div>
    </div>
  )
}

export default WatchPage
