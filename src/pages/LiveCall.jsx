import React, { useEffect, useState } from "react";
import "../../src/style.css";
import { useSelector } from "react-redux";
import socketIOClient from 'socket.io-client';
import { api } from "../mockData";
function LiveCall() {
    const state = useSelector((state) => state?.user?.user);
    const [number, setNumber] = useState(0);

   useEffect(() => {
      const socket = socketIOClient(`${api.dev}`);
  
      // Listen for events from the server
      socket.on("call_details", (data) => {
          // Handle the received data (e.g., update state, trigger a re-fetch)
          if (data?.data !== undefined) {
              // Get the count of objects in the received data
               const newDataCount = Object.keys(data.data).length;
               setNumber(newDataCount)
          }
      });
  
      return () => {
          // Disconnect the socket when the component unmounts
          socket.disconnect();
      };
  }, []); // Empty dependency array ensures this effect runs once on mount

  // const randomNumber = (()=>{
  //   setTimeout(() => {
  //     let x = Math.floor(Math.random() * 100 + 1);
  //     setNumber(x);
  //   }, 7000);
  // })
  //   useEffect(() => {
  //     randomNumber()
  //     }, [number ]);
  // {user && user?.role === "User" ? <></> : <>0</>}
  return (
    <div>
        <sub style={{color:"#000",textTransform:"capitalize",fontSize:"14px"}} className="live_icon">{number}</sub>
    </div>
  )
}

export default LiveCall