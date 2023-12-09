import './SideBar.scss'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage/ProfileImage';


export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const[isLogin,setIsLogin]=useState(true)

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width:250,backgroundColor:"skyblue",height:"100%" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
            <div>
              <div className="side-logo">
                OLXA
              </div>

              {
                isLogin?(<div className='profile-img'><ProfileImage pimage={undefined}/></div>):(

                  <ul className='sideBar'>
                <li>
                  <Link to={'/'}> Home</Link>
                </li>
                <li>
                  <Link to={'/login'}> Login</Link>
                </li>
                <li>
                  <Link to={'/register'}> Register</Link>
                </li>
              </ul>
                )
              }
              
            </div>
      </List>
      
    </Box>
  );

  return (
    <div>
      
    <>
      <Button onClick={toggleDrawer("left", true)}>{<GiHamburgerMenu size={27} color='black' />}</Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </>

</div>
  );
}