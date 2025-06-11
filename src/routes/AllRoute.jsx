import React, { useEffect, useState } from "react";
import { Routes as Switch, Route, BrowserRouter } from "react-router-dom";
import Router from "./route";
//import Home from "../components/home/homepage";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/login/Login";
import ForgotPassword from "../components/forgot_password/ForgotPassword";
import { useSelector } from "react-redux";
function All_Route() {
  const state = useSelector((state) => state);

 //  ------------------------       Admin Portal Session Time out Mounting       -------------------------------
  useEffect(() => {
    // Retrieve the token from localStorage
    const tokenString = localStorage.getItem("admin");
    if (!tokenString) {
      //console.error('No token found in localStorage');
     // window.location.replace("/login");
      return;
    }

    // Parse the token JSON
    const token = JSON.parse(tokenString);

    // Function to decode JWT payload
    const decodePayload = (token) => {
      try {
        const base64Url = token.split('.')[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Correct the encoding
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error('Failed to decode the token', e);
        return null;
      }
    };

    const payload = decodePayload(token.access_token);
    if (!payload) {
      console.error('Failed to decode the payload');
      return;
    }

    // Extract the 'exp' value (in seconds since epoch)
    const expirationTime = payload.exp;

    // Get the current time (in seconds since epoch)
    const currentTime = Math.floor(Date.now() / 1000);

    // Calculate time until expiration (in milliseconds)
    const timeUntilExpiration = (expirationTime - currentTime) * 1000;
    // Check if the token has already expired
    if (expirationTime <= currentTime) {
     
      localStorage.removeItem("theme-color");
        localStorage.removeItem("admin");
       // Immediate redirect to login page
       window.location.reload();

       //window.location.replace("/login");
    } else {
      //console.log('Token is still valid');

      // Set a timeout to refresh the page when the token expires
      const timeoutId = setTimeout(() => {
        localStorage.removeItem("theme-color");
        localStorage.removeItem("admin");
        window.location.reload();
      }, timeUntilExpiration);

      // Cleanup the timeout if the component is unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [state]); // Empty dependency array to run the effect once on component mount

 //  ------------------------       Manage Portal Session Time out Mounting      -------------------------------
  useEffect(() => {
    // Retrieve the token from localStorage
    const current_user = localStorage.getItem("current_user");
    const tokenString = localStorage.getItem(`user_${current_user}`);
    if (!tokenString) {
      //console.error('No token found in localStorage');
     // window.location.replace("/login");
      return;
    }

    // Parse the token JSON
    const token = JSON.parse(tokenString);

    // Function to decode JWT payload
    const decodePayload = (token) => {
      try {
        const base64Url = token.split('.')[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Correct the encoding
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error('Failed to decode the token', e);
        return null;
      }
    };

    const payload = decodePayload(token.access_token);
    if (!payload) {
      console.error('Failed to decode the payload');
      return;
    }

    // Extract the 'exp' value (in seconds since epoch)
    const expirationTime = payload.exp;

    // Get the current time (in seconds since epoch)
    const currentTime = Math.floor(Date.now() / 1000);

    // Calculate time until expiration (in milliseconds)
    const timeUntilExpiration = (expirationTime - currentTime) * 1000;
    // Check if the token has already expired
    if (expirationTime <= currentTime) {
     
        localStorage.removeItem(`user_${current_user}`);
        localStorage.removeItem("current_user");
        localStorage.removeItem("selectedTab")
       // Immediate redirect to login page
       window.location.reload();

       //window.location.replace("/login");
    } else {
      //console.log('Token is still valid');

      // Set a timeout to refresh the page when the token expires
      const timeoutId = setTimeout(() => {
        window.location.reload();
        localStorage.removeItem(`user_${current_user}`);
        localStorage.removeItem("current_user");
        localStorage.removeItem("selectedTab")
      }, timeUntilExpiration);

      // Cleanup the timeout if the component is unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [state]); // Empty dependency array to run the effect once on component mount

  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* {user === "" || user === null ? ( */}
          <>
            {/* <Route path={Router.HOME} element={<Home />} /> */}
            <Route exact path={Router.LOGIN} element={<Login />} />
            <Route exact path="/forgot_password" element={<ForgotPassword />} />
          </>
          {/* ) : (  */}
          <>
            <Route exact path={Router.MAIN} element={<PrivateRoute />} />
          </>
          {/* )}
           */}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default All_Route;
