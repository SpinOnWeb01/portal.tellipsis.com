import React, { useEffect, useState } from "react";
import "../../src/style.css";
import { useSelector } from "react-redux";

function LiveCall() {
    const state = useSelector((state) => state?.user?.user);
    const [number, setNumber] = useState(0);

    const generateRandomNumber = () => {
      const randomNumberTimeout = setTimeout(() => {
        let x = Math.floor(Math.random() * 100 + 1);
        setNumber(x);
      }, 7000);
  
      return randomNumberTimeout; // Return the timeout ID
    };
  
    useEffect(() => {
      const randomNumberTimeout = generateRandomNumber();
  
      return () => {
        // Clear the timeout when the component unmounts or when `number` changes
        clearTimeout(randomNumberTimeout);
      };
    }, [number]);

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