import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChannelVideo from './ChannelVideo'
import { useDispatch } from 'react-redux'
import { sidebarshow } from '../utils/YoutubeSlice'
import { sidebarshowwindow } from '../utils/YoutubeSlice'
import { useSelector } from 'react-redux'
import { addsubscribe } from '../utils/YoutubeSlice'
import { unsubscribe } from '../utils/YoutubeSlice'
import { channelsubscription } from '../utils/YoutubeSlice'

const Channel = () => {
    const {id} = useParams()
    const [channelVideos,setchannelVideos] = useState([])
    const [channelvideosubscribe,setchannelvideosubscribe] = useState([])
    const dispatch = useDispatch()
    const channelAPI = async() =>{
        const url = await fetch(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${id}&maxResults=25&key=AIzaSyAuz27CUz0uGoI9pQxb_eiqLbjPAr07YjQ`)
        const jsonfile = await url.json()
        //console.log(jsonfile);
        setchannelVideos(jsonfile.items)
        setchannelvideosubscribe(jsonfile.items)
    }
     
   useEffect(()=>{
    channelAPI()
    //console.log(channelVideos);
   },[id])

   useEffect(()=>{

    const windowsize = () => {
     if(window.innerWidth){
       dispatch(sidebarshow())
     }
    }      
     window.addEventListener('resize',windowsize)

     return () => {
       window.removeEventListener('resize',windowsize)
     }
 },[window.innerWidth])

 useEffect(()=>{
  if(window.innerWidth <= 600){
    dispatch(sidebarshow())
  }
  else{
    dispatch(sidebarshowwindow())
  }
 },[])

 const subscribechannel = useSelector((store) => store.app.subscribe)

 let subchannel = false
  
 subscribechannel.map((value) => {
  value.map(video => {
      if(video?.snippet?.channelId === channelVideos[0]?.snippet?.channelId){
        subchannel = true
      }
      else{
        subchannel = false
      }
  })
 })
 const unsub = () => {
  dispatch(unsubscribe(channelVideos[0]?.snippet?.channelId))
 }

 const addsub = () => {
  if(subchannel === true){}
  else{
    dispatch(addsubscribe(channelvideosubscribe))
  }
 }

  return (
    <div className='channel'>
          <div className='banner'>
            <h1>{channelVideos[0]?.snippet?.channelTitle}</h1>
        </div>
       {
        subchannel ? <div style={{backgroundColor:"red",color:"black",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}} onClick={unsub}>UNSUBSCRIBE</div> : 
        <div style={{backgroundColor:"red",color:"black",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}} onClick={addsub}>SUBSCRIBE</div>
       }
    <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
        
      {
            channelVideos.map((value,index) =>(
                <div key={index}>
                  <ChannelVideo video={value} /> 
                </div>
            )
            
            )
        }
    </div>
 
    </div>
  )
}

export default Channel
