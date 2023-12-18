import { Link, useNavigate } from 'react-router-dom'
import './NavBar.scss'
import ProfileImage from '../ProfileImage/ProfileImage'
import { BsSearch } from "react-icons/bs";
import SideBar from '../SideBar/SideBar'
import SpeedDail from '../Speed Dail/SpeedDail';
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';


const NavBar = () => {
  const navigate = useNavigate()
  const {user} = useSelector(state=>state.user)
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get('keyword') || ""

  const {isLoggedIn} = useSelector(state=>state.user)
  const [keyword,setKeyword] = useState("")

  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get('keyword') || ""
    setKeyword(paramValue)
    
    
  },[paramValue])
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
          </div>
           }
          
          <div className='auth'>
          {
            isLoggedIn? (<ProfileImage pimage={user?.avatar[0]?.cloudLink}/>) : (
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