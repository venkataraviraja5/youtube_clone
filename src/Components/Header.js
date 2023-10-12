import React, { useEffect, useState } from 'react'
import "../Components/Header.css"
import { useDispatch } from 'react-redux'
import { isShow } from '../utils/YoutubeSlice'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sidebarshow } from '../utils/YoutubeSlice';
import { sidebarshowwindow } from '../utils/YoutubeSlice';

const Header = () => {
    const [text,settext] = useState("")
    const [suggestions,setsuggestions] = useState([])
    const [suggestionsshow,setsuggestionsshow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
          setsuggestionsshow(false);
        };
    
        window.addEventListener('scroll', handleScroll); 
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


    const dispatch = useDispatch()
  const sidebar = () =>{
    dispatch(isShow())
  }



  const suggestionApi = async() =>{
    const datafile = await fetch( "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" + text);
    const jsonfile = await datafile.json();
    //console.log(datafile);
    setsuggestions(jsonfile[1])
  }
  useEffect(()=>{
   const timer = setTimeout(()=> suggestionApi() , 200)

   return () => {
    clearTimeout(timer);
  };
  },[text])


useEffect(() => {
  suggestionApi()
},[])

 const searchclick = (value) => {
  setsuggestionsshow(false)
  settext(value)
 }
  return (
    <div className='head-flex' >
        <div>
        <div className='head' >
      <div className='left' >
        <MenuIcon onClick={sidebar} style={{marginTop:"10px",marginLeft:"10px",fontSize:"30px"}}/>
      <Link to={"/"} className='link-line' ><img src='https://yt3.googleusercontent.com/584JjRp5QMuKbyduM_2k5RlXFqHJtQ0qLIPZpwbUjMJmgzZngHcam5JMuZQxyzGMV5ljwJRl0Q=s900-c-k-c0x00ffffff-no-rj' /></Link>
      </div>
      <div className='middle' >
           <div>
           <input type='text' placeholder='search' className='search-box'
            value={text}
            onChange={(e)=>settext(e.target.value)}
            onFocus={()=>setsuggestionsshow(true)}
            />
            <Link to={"/search/" + text} className='link-line'><button onClick={()=>setsuggestionsshow(false)}>
              <img src='https://img.icons8.com/?size=1x&id=132&format=png' style={{height:"10px",width:"20px"}}/></button></Link>
    
           </div>
           {
             suggestionsshow && (
                <div className='suggestions'>
               {suggestions.map((value, index) => (
                  <Link to={"/search/" + value}  className='link-line'> <p key={index} onClick={() => searchclick(value)}>
              <SearchIcon />
             {value}
               </p></Link>
               ))}
            </div>
              )
            }
           
      </div>
     
      <div className='right'> 
        
      </div>
      
    </div> 
    <div className='line'></div>
        </div>
        <div>
            <Outlet />
        </div>
        
    </div>
  )
}

export default Header
