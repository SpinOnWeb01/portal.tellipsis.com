import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';


function AdminLayout({colorThem,handleClick}) {
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

export default AdminLayout