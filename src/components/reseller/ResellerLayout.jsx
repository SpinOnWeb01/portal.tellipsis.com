import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from './ResellerSidebar';
import Header from './ResellerHeader';


function ResellerLayout({colorThem,handleClick}) {
 // alert(colorThem)
  return (
    <>
    <div className={`App ${colorThem} `}>
      <Header colorThem={colorThem} handleClick={handleClick} />
      <Sidebar colorThem={colorThem} />
      <Outlet />
      </div>
    </>
  )
}

export default ResellerLayout;