import React from 'react'
import "../Components/Sidebar.css"
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sidebarshow } from '../utils/YoutubeSlice'

const SideBar = () => {
    const show = useSelector(store => store.app.hamValue)
    const dispatch = useDispatch()
    
    if(!show){
     return null
    }

    const sidebar = () => {
      if(window.innerWidth <= 600){
        dispatch(sidebarshow())
      }
    }
  return (
    <div className='sidebar'>

      <Link to="/" className='line-dec'><p className='side-name' onClick={sidebar}>Home</p></Link>
       <p className='side-name'>Shorts</p>
       <Link to="/subscriptions" className='line-dec' onClick={sidebar}> <p className='side-name'>Subscriptions</p> </Link>
       ------------------
       <p className='side-name'>Library</p>
       <Link to="/history"  className='line-dec' onClick={sidebar}><p className='side-name'>History</p> </Link> 
       <p className='side-name'>Watch Later</p>
       <Link to="/liked-videos"  className='line-dec' onClick={sidebar}><p className='side-name'>Liked Videos</p> </Link> 
   
    </div>
  )
}

export default SideBar
