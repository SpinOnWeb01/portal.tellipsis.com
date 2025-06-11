import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../../src/style.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
// import Navbar from "./Navbar";
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NightlightIcon from '@mui/icons-material/Nightlight';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import '../../Switcher.scss';
import Cps from "../../pages/Cps";
import Cc from "../../pages/Cc";
import { api } from "../../mockData";

function Header({colorThem, handleClick}) {
 // console.log(colorThem)
  const [selectedValue, setSelectedValue] = useState(''); // State to hold the selected value
  const state = useSelector((state) => state?.user?.user);
  const user = JSON.parse(localStorage.getItem("admin"));
  const [pageRedirect, setPageRedirect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state;

  

  const handleSelect = (eventKey) => {
    // When a Dropdown.Item is clicked, update the selected value
    setSelectedValue(eventKey);
  
  };

  const logout = async() => {
    // let data = JSON.stringify({
    //   "user_uuid": user?.user_uuid
    // });
    const token = JSON.parse(localStorage.getItem("admin"));
    const config = {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token.access_token} `
    };
    const { data } = await axios.post(
      
      
      
      `${api.dev}/api/logout`,
      {},
      {
        headers: config
      }
    )
    if(data?.status === 200){
         toast.info(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        localStorage.removeItem("theme-color");
        localStorage.removeItem("admin");
        navigate("/");
     
      }
  };

  useEffect(() => {
    let activityTimeout;

    const resetActivityTimeout = () => {
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        localStorage.removeItem("theme-color");
        localStorage.removeItem("admin");
        setPageRedirect(true);
      }, 3600 * 3000); // 1 hour
    };

    const handleUserActivity = () => {
      resetActivityTimeout();
    };

    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keypress', handleUserActivity);

    resetActivityTimeout(); // Initialize activity timeout on component mount

    return () => {
      clearTimeout(activityTimeout); // Cleanup event listeners and timeout on component unmount
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
    };
  }, []); // Empty dependency array to ensure the effect runs only once on component mount


 

  useEffect(() => {
    if (pageRedirect) {
      // Redirect to the login page
      navigate('/login');
    }
  }, [pageRedirect]); // Redirect when pageRedirect changes
  
  useEffect(() => {
    
    if (selectedValue === 'Manage') {
      navigate('/manage');
    }
    
  }, [selectedValue]); // This effect runs whenever selectedValue changes

  return (
    <>
     <div className={`App ${colorThem} `}>

<div className="contant_box" >
      <Box sx={{ flexGrow: 1 }} className={`App ${colorThem} manage_boxx`}>

      
        <AppBar position="static" className="manage_top_header">

        <Box className="manage_mobile_logo d-lg-none d-md-none d-sm-block d-block">
      <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="d-flex align-items-center justify-content-center"
            >
              <a href="/admin_portal" className="mobile_logo_center">

              {colorThem === "theme_white" ? (<> <img
                src="/img/logo_white11.png"
                alt="Manage Logo"
                className="img-fluid d-block"
                style={{cursor:"pointer"}}
              /></>) : (<>
                 <img
                src="/img/logo-4-edit-1.png"
                alt="Manage Logo"
                className="img-fluid d-block"
                style={{cursor:"pointer"}}
              />
              </>)}
              </a>
            </Typography>
      </Box>


          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="d-flex align-items-center d-block logo_image d-lg-block d-md-block d-sm-none d-none"
            >
              <a href="/admin_portal">

              {colorThem === "theme_white" ? (<> <img
                src="/img/logo_white11.png"
                alt="Manage Logo"
                className="img-fluid d-block admin_logo"
                style={{cursor:"pointer"}}
              /></>) : (<>
                 <img
                src="/img/logo-4-edit-1.png"
                alt="Manage Logo"
                className="img-fluid d-block admin_logo"
                style={{cursor:"pointer"}}
              />
              </>)}

              {/* <img
                src="/img/logo.png"
                alt="Manage Logo"
                className="img-fluid d-block"
                style={{cursor:"pointer"}}
              /> */}
              </a>
            </Typography>

            <div className="manage_rgiht_bdr d-flex align-items-center justify-content-between me-lg-0 me-md-0 m-auto">

            <Box className="header_cps">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                className="manage_call"
              >
                {/* <LocalLibraryIcon className="call_icon" /> */}
                {/* <LiveCall /> */}
                CC &nbsp;
                <Cps/>
              </IconButton>
              </Box>

            <div className="theme_options">

            
          {colorThem === "theme_white" ? 
          (<><Tooltip title="Light Theme" disableInteractive interactive><IconButton onClick={() => handleClick('theme_blue')}> <DarkModeIcon id="theme_white"
           className={`${colorThem === 'theme_white' ? 'active' : ''}`}
            /></IconButton></Tooltip></>)

         : (<><Tooltip title="Dark Theme" disableInteractive interactive><IconButton onClick={() => handleClick('theme_white')}> <NightlightIcon id="theme_blue"
         className={`${colorThem === 'theme_white' ? 'active' : ''} fa-solid fa-moon`} 
         /></IconButton></Tooltip> </>)}

            
        {/* <button id="theme_white"
         className={`${colorThem === 'theme_white' ? '' : ''}`}
         onClick={() => handleClick('theme_white')}></button>
        <button id="theme_blue"
         className={`${colorThem === 'theme_white' ? '' : ''}`} 
         onClick={() => handleClick('theme_blue')}></button>
        <button id="theme_orange"
         className={`${colorThem === 'theme_white' ? '' : ''}`} 
         onClick={() => handleClick('theme_orange')}></button>
        <button id="theme_purple"
         className={`${colorThem === 'theme_white' ? '' : ''}`} 
         onClick={() => handleClick('theme_purple')}></button>
        <button id="theme_green"
         className={`${colorThem === 'theme_white' ? '' : ''}`} 
         onClick={() => handleClick('theme_green')}></button>
        <button id="theme_black"
         className={`${colorThem === 'theme_white' ? '' : ''}`} 
         onClick={() => handleClick('theme_black')}></button> */}

         
      </div>

{/* 
      <Tooltip title="Live Calls" disableInteractive interactive>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                className="manage_call"
              >
                <CallIcon className="call_icon" /> */}
                {/* <LiveCall /> */}
                {/* Live
              </IconButton>
              </Tooltip> */}

             
              <div className="dshbrd_hdr_icon">
                <ul>
                  <li>
                    <ul className="hdr_profile">
                      <li>
                        {/* Add a class to the image element */}
                        {user.user_role === "Reseller"? (<> <img
                          src="/img/reseller.png"
                          className="img-fluid d-block rounded-circle" // Apply rounded-circle class for circular display
                          alt="profile"
                        /></>):(<> <img
                          src="/img/nav_author.jpg"
                          className="img-fluid d-block rounded-circle" // Apply rounded-circle class for circular display
                          alt="profile"
                        /></>)}
                       
                        <div className="profile_name">
                          <b>{user?.user_name}</b>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* {user?.user_role === "Superadmin" ? (<></>):(<>
                <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle
                  className="dropbtn"
                  id="dropdown-basic"
                  style={{
                    color: "#000",
                    textTransform: "capitalize",
                    fontSize: "14px",
                  }}
                >
                  Services
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {selectedValue === "Manage" ?(<>
                  <Dropdown.Item  eventKey="Redirect">Redirect</Dropdown.Item>
                  <Dropdown.Item href="/sip" eventKey="Sip">Sip</Dropdown.Item></>):(<>
                  <Dropdown.Item  eventKey="Manage">Manage</Dropdown.Item>
                  <Dropdown.Item href="/sip" eventKey="Sip">Sip</Dropdown.Item></>)}
                  
                  
                </Dropdown.Menu>
              </Dropdown></>)} */}
             
             <Tooltip title="Logout" disableInteractive interactive>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                style={{ paddingRight: "0" }}
                onClick={logout}
              >
                <LogoutIcon className="call_icon " />
              </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
        {/* <!--navbar-sec--> */}
        {/* <Navbar selectedValue={selectedValue}/> */}
      </Box>
      </div>
      </div>
    </>
  );
}

export default Header;
