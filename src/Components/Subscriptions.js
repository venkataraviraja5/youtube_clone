import React from 'react'
import "../Components/Subscriptions.css"
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { unsubscribe } from '../utils/YoutubeSlice'

const Subscriptions = () => {
 
    const subscribechannel = useSelector(store => store.app.subscribe)
    const dispatch = useDispatch()
     
   // console.log(subscribechannel);
    const unsub = (value) => {
        dispatch(unsubscribe(value))
       }

  return (
    <div className='subscribepage'>
      <div className='subscribechannel'>
        {subscribechannel.length>0 ? null : <h2>NO SUBSCRIPTIONS!!!!</h2>}
        {
            subscribechannel.map((channel,index) => (
              
                    <div className='subscribe-card' key={index}> 
                   <Link to={"/channel/" + channel[0]?.snippet.channelId} className='link'>
                   <h1>{channel[0].snippet.channelTitle}</h1>
                   </Link>
                   <h5 className='subscribe' onClick={() => unsub(channel[0]?.snippet?.channelId)}>Unsubscribe</h5>
                </div>
              
            ))
        }
      </div>
      
    </div>
  )
}

export default Subscriptions

