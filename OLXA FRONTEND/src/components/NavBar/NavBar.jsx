import { Link } from 'react-router-dom'
import './NavBar.scss'
import ProfileImage from '../ProfileImage/ProfileImage'
import { BsSearch } from "react-icons/bs";
import SideBar from '../SideBar/SideBar'
import SpeedDail from '../Speed Dail/SpeedDail';
import {useSelector} from 'react-redux'


const NavBar = () => {
  const {isLoggedIn} = useSelector(state=>state.user)
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