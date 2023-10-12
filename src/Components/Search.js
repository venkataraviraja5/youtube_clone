import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import WatchSearch from './WatchSearch'

const Search = () => {
    const {id} = useParams()
    const [searchvideos,setsearchvideos] = useState([])
    //console.log(id);
    const searchAPI = async () =>{
        const url = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${id}&key=AIzaSyAuz27CUz0uGoI9pQxb_eiqLbjPAr07YjQ`)
        const datafile = await url.json();
        //console.log(datafile);
        setsearchvideos(datafile.items)
    } 
    useEffect(()=>{
        searchAPI()
    },[id])


    
  return (
    <div className='video-container'>
    
        {
            searchvideos.map((value,index) =>(
                <div key={index}>
                   <WatchSearch video={value}/>
                </div>
            )
            
            )
        }
    
    </div>
  )
}

export default Search
