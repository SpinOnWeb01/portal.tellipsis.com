import axios from "axios";
import { CREATE_EXTENSION_FAIL, CREATE_EXTENSION_REQUEST, CREATE_EXTENSION_SUCCESS, DELETE_EXTENSION_FAIL, DELETE_EXTENSION_REQUEST, DELETE_EXTENSION_SUCCESS, GET_EXTENSION_FAIL, GET_EXTENSION_REQUEST, GET_EXTENSION_SUCCESS, UPDATE_EXTENSION_FAIL, UPDATE_EXTENSION_REQUEST, UPDATE_EXTENSION_SUCCESS } from "../../constants/adminPortal/extensionConstants";
import {api} from '../../../mockData'
import { toast } from "react-toastify";

export const getExtension = (radioValue) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_EXTENSION_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/extensions?active=${radioValue}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token.access_token} `
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_EXTENSION_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {
          let errorMessage = "An error occurred while fetching data.";
          if (error.response) {
            if (error.response.status === 403) {
              errorMessage = "Permission Denied";
            } else if (error.response.status === 400 || error.response.status === 401 || error.response.status === 500) {
              errorMessage = error.response.data.message || "Bad Request";
            }
          }
          dispatch({ type: GET_EXTENSION_FAIL, payload: errorMessage });
        });
    } catch (error) {
      dispatch({ type: GET_EXTENSION_FAIL, payload: error.response.data.message });
    }
  };

  export const createExtension = (createExtensn, handleClose, setResponse) => async (dispatch) => {
    
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: CREATE_EXTENSION_REQUEST });
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        const { data } = await axios.post(
          
          
          `${api.dev}/api/extensions`,
          createExtensn,
          config
        );
       if (data?.status === 200) {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          handleClose();
          setResponse(data);      
        }  else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
        dispatch({ type: CREATE_EXTENSION_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: CREATE_EXTENSION_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };

    export const updateExtension = (updateExtensn, handleCloseModal, setResponse,) => async (dispatch) => {
      const token = JSON.parse(localStorage.getItem("admin"));
        try {
          dispatch({ type: UPDATE_EXTENSION_REQUEST });
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token.access_token} `
            },
          };
          const { data } = await axios.put(
            
            
            `${api.dev}/api/extensions`,
            updateExtensn,
            config
          );
         if (data?.status === 200) {
            toast.success(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
            handleCloseModal();
            setResponse(data);        
          }  else {
            toast.error(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          }
          dispatch({ type: UPDATE_EXTENSION_SUCCESS, payload: data });
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: UPDATE_EXTENSION_FAIL,
            payload: error?.response?.data?.message,
          });
        }
      };

      export const deleteAdminExtension = (userData, setResponse, setExtensionId) => async (dispatch) => {
  
        try {
          dispatch({ type: DELETE_EXTENSION_REQUEST });
      const token = JSON.parse(localStorage.getItem(`admin`));
    
          fetch(`${api.dev}/api/extensions`, {
            method: 'DELETE',
            body: JSON.stringify(userData), // Using body instead of data for sending data
            headers: {
              'Authorization': `Bearer ${token.access_token}`,
              'Content-Type': 'application/json'
            },
          })
          .then(response => {
            if (response.status === 200) {
              // Parse JSON response
              return response.json();
            } else {
              // Handle error status
              throw new Error(`Request failed with status ${response.status}`);
            }
          })
          .then(data => {
            // Handle successful response
            toast.success(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
            setResponse(data);
            setExtensionId("");
            dispatch({ type: DELETE_EXTENSION_SUCCESS, payload: data });
          })
          .catch(error => {
            // Handle fetch errors
            toast.error('Error deleting. Please try again later.', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
          });
          
          
        } 
         catch (error) {
          dispatch({ type: DELETE_EXTENSION_FAIL, payload: error.response.data.message });
        }
      };