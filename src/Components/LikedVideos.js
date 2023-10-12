import React from 'react'
import "./Likedvideos.css"
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'

const LikedVideos = () => {

  let likedthumb = useSelector(store => store.app.thumbnails)  

  //console.log(likedthumb);
  return (
    <div className='liked'>
       <div className='liked-videos'>
        {likedthumb.length > 0 ? null : <h2>NO LIKED VIDEOS !!!</h2>}
       {
          likedthumb.map((value, index) => (
            <div key={index} className='liked-card'> 
             <Link to={"/watch?v=" + value[0].id} > <img src={value[0].snippet.thumbnails.high.url} alt={`Thumbnail ${index}`} className='like-image'/> </Link>
             <p>{value[0].snippet.localized.title}</p>
            </div>
          ))
        }
       </div>
    </div>
  )
}

export default LikedVideos
