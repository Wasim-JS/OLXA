import { Link } from 'react-router-dom'
import './NavBar.scss'
import { useState } from 'react'
import ProfileImage from '../ProfileImage/ProfileImage'
import { BsSearch } from "react-icons/bs";
// import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from '../SideBar/SideBar'


const NavBar = () => {
  const[isLoggedIn,setIsLoggedIn]=useState(false)
  return (
      <header>
        <div className="logo">
          OLXA
        </div>

        <nav>
          <ul className='homeRoute'>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
          </ul>

          <div className='serachBar'>
          <BsSearch />
             <input placeholder='Search Products Here.....' type="text" name="" id="" />
          </div>
          
          <div className='auth'>
          {
            isLoggedIn? (<ProfileImage pimage={undefined}/>) : (
              <>
              <ul className='authroutes'>
              <li>
                  <Link to={'/login'}>Login</Link>
              </li>
                <li>
                  <Link to={'/register'}>Register</Link>
                </li>
            </ul>

            <div className='menu'>
              <SideBar />
            </div>
              </>
            )
          }
           </div>
          
        </nav>
      </header>
  )
}

export default NavBar