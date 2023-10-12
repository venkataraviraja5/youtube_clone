import React, { useEffect } from 'react'
import "../Components/History.css"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Video from './Video'
import WatchSearch from './WatchSearch'

const History = () => {

    const historyvideo = useSelector((store) => store.app.history)
    const searchhistoryvideos = useSelector((store) => store.app.searchhistory)
    
    useEffect(()=>{
      searchhistoryvideos.map(value => {
        console.log(value);
      })
    })
  return (
    <div className='history-page'>
    
   <div className='history-card'>
   {historyvideo.length > 0 || searchhistoryvideos.length > 0 ? null : <h2>NO HISTORY!!!</h2>}
    {
      historyvideo.map((value,index) => (
        <div key={index} >
            <Video video={value} />
          </div>
      ))
    }
    </div>
       <div className='history-card'>
       {
            searchhistoryvideos.map((value,index) =>(
                <div key={index}>
                   <WatchSearch video={value}/>
                </div>
            )
            
            )
        }
       </div>
    </div>
   
  )
}

export default History
