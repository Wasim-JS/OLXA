import { Link, useNavigate } from 'react-router-dom'
import './NavBar.scss'
import ProfileImage from '../ProfileImage/ProfileImage'
import { BsSearch } from "react-icons/bs";
import SideBar from '../SideBar/SideBar'
import SpeedDail from '../Speed Dail/SpeedDail';
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import { FaMicrophoneAlt } from "react-icons/fa";
import useVoiceSearch from '../../Custom Hooks/useVoiceSearch';
import useAlert from '../../Custom Hooks/alert';
import audios from '../../assets/a.mp3'





const NavBar = () => {
  const navigate = useNavigate()
  const {user} = useSelector(state=>state.user)
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get('keyword') || ""
  const [alertFunc] = useAlert()
  const audio = new Audio(audios)
  const [voiceSearch,setVoiceSearch] = useState(false);

  const {isLoggedIn} = useSelector(state=>state.user)
  const [keyword,setKeyword] = useState("")
  const [rec] = useVoiceSearch();

  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get('keyword') || ""
    setKeyword(paramValue)
    
    
  },[paramValue])

  rec.onstart = () => {
    audio.play()
    alertFunc('success',"Listining.....")
  };

  rec.onend = () => {
    console.log('stopped');
    setVoiceSearch(false)
  };

  rec.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    navigate(`/search?keyword=${transcript}`)
    
    
  };

  const handleVoiceSearch = () =>{

    rec.start()
    setVoiceSearch(true)

  }
 
  const handleSearch = (e) =>{
    if(e.key === "Enter")
    {
      console.log("en")
      navigate(`/search?keyword=${keyword}`)
      // <Navigate to={`/search?keyword=${keyword}`} />
     
    }

  }
  return (
      <header>
        <div className="logo">
          OLXA
        </div>

        <nav>
          <ul className='homeRoute'>
            <li>
              {
                isLoggedIn?( <Link to={`/home2`}>Home</Link>):( <Link to={`/`}>Home</Link>)
              }
              

              
            </li>
          </ul>
           {

          isLoggedIn && <div className='serachBar' >
          <BsSearch color='white' />
             <input value={keyword} onChange={({target})=> setKeyword(target.value) } placeholder='Search Products Here.....'  onKeyDown={handleSearch} type="text" name="" id="" />
             <button title='click and speak' className={`${voiceSearch?"vbtns":""}`} id='vbtn' onClick={handleVoiceSearch}><FaMicrophoneAlt size={25} color='white'/></button>
          </div>
           }
          
          <div className='auth'>
          {
            isLoggedIn? (
              <>
              <span style={{margin:"0px 10px",fontWeight:800}}>{user?.role==='admin'?(`${user?.name} (Admin)`):(user?.name)}</span>
            <ProfileImage pimage={user?.avatar[0]?.cloudLink}/>
              </>
            ) : (
              <>
              <ul className='authroutes'>
              <li>
                  <Link to={'/login'}>Login</Link>
              </li>
                <li>
                  <Link to={'/register'}>Register</Link>
                </li>
            </ul>

              </>
            )
          }
          </div>

            <div className='menu'>
              <SideBar />
            </div>
            
            {
              isLoggedIn && <SpeedDail />
            }
            
          
        </nav>
      </header>
  )
}

export default NavBar