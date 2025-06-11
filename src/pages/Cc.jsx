import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
import { api } from '../mockData';

function Cc() {
    const [cc, setCc] = useState(0); // Initialize count to 0
    
    useEffect(() => {
        const socket = socketIOClient(`${api.dev}`);
    
        // Listen for events from the server
        socket.on("call_details", (data) => {
            // Handle the received data (e.g., update state, trigger a re-fetch)
            if (data?.data !== undefined) {
                // Get the count of objects in the received data
                // const newDataCount = Object.keys(data.data).length;
                // Update state with the count of objects received in the current response
                setCc(data?.data);
            }
        });
    
        return () => {
            // Disconnect the socket when the component unmounts
            socket.disconnect();
        };
    }, []); // Empty dependency array ensures this effect runs once on mount
    
    return (
        <div>{cc !== 0 ? (<>{cc}</>) : (<>0</>)}</div>
    );
}

export default Cc;
