import {api} from '../../../mockData'
import { toast } from "react-toastify";
import axios from "axios";
import { CREATE_MANAGE_QUEUE_FAIL, CREATE_MANAGE_QUEUE_MEMBER_FAIL, CREATE_MANAGE_QUEUE_MEMBER_REQUEST, CREATE_MANAGE_QUEUE_MEMBER_SUCCESS, CREATE_MANAGE_QUEUE_REQUEST, CREATE_MANAGE_QUEUE_SUCCESS, DELETE_MANAGE_QUEUE_MEMBER_FAIL, DELETE_MANAGE_QUEUE_MEMBER_REQUEST, DELETE_MANAGE_QUEUE_MEMBER_SUCCESS, GET_MANAGE_QUEUE_FAIL, GET_MANAGE_QUEUE_MEMBER_FAIL, GET_MANAGE_QUEUE_MEMBER_REQUEST, GET_MANAGE_QUEUE_MEMBER_SUCCESS, GET_MANAGE_QUEUE_REQUEST, GET_MANAGE_QUEUE_SUCCESS, UPDATE_MANAGE_QUEUE_FAIL, UPDATE_MANAGE_QUEUE_REQUEST, UPDATE_MANAGE_QUEUE_SUCCESS } from '../../constants/managePortal/managePortal_queueConstants';
export const getManageQueue = () => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    try {
      dispatch({ type: GET_MANAGE_QUEUE_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/userqueues`,
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token.access_token} `
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_MANAGE_QUEUE_SUCCESS,
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
          dispatch({ type: GET_MANAGE_QUEUE_FAIL, payload: errorMessage });
        
        });
    } catch (error) {
      toast.error(error?.response?.data?.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      dispatch({ type: GET_MANAGE_QUEUE_FAIL, payload: error.response.data.message });
    }
  };

  export const createManageQueue = (createAdminQueue, setOpen, setResponse, setPassword,setMoh, setRingtimeout) => async (dispatch) => {
  
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
        try {
          dispatch({ type: CREATE_MANAGE_QUEUE_REQUEST });
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token.access_token} `
            },
          };
          const { data } = await axios.post(
            
            
            `${api.dev}/api/userqueues`,
            createAdminQueue,
            config
          );
         if (data?.status === 200) {
            toast.success(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
            setOpen(false);
            setResponse(data);
            setPassword("") ;
            setMoh("") 
            setRingtimeout("")    
          }  else {
            toast.error(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          }
          dispatch({ type: CREATE_MANAGE_QUEUE_SUCCESS, payload: data });
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: CREATE_MANAGE_QUEUE_FAIL,
            payload: error?.response?.data?.message,
          });
        }
      };
  
      export const updateManageQueue = (updateAdminQueue, setOpenModal, setResponse, setPassword, setMoh, setRingtimeout) => async (dispatch) => {
        const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
          try {
            dispatch({ type: UPDATE_MANAGE_QUEUE_REQUEST });
            const config = {
              headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.access_token} `
              },
            };
            const { data } = await axios.put(
              
              
              `${api.dev}/api/userqueues`,
              updateAdminQueue,
              config
            );
           if (data?.status === 200) {
              toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
              });
              setOpenModal(false);
              setResponse(data);
              setPassword("") ;
              setMoh("") 
              setRingtimeout("")      
            }  else {
              toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
            }
            dispatch({ type: UPDATE_MANAGE_QUEUE_SUCCESS, payload: data });
          } catch (error) {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
            dispatch({
              type: UPDATE_MANAGE_QUEUE_FAIL,
              payload: error?.response?.data?.message,
            });
          }
        };
export const getManageQueueMember = () => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
      try {
        dispatch({ type: GET_MANAGE_QUEUE_MEMBER_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/userqmembers`,
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: GET_MANAGE_QUEUE_MEMBER_SUCCESS,
              payload: response?.data?.data,
            });
          })
          .catch((error) => {
            toast.error(error?.response?.data?.msg, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
            console.log('error', error)
          });
      } catch (error) {
        toast.error(error?.response?.data?.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        dispatch({ type: GET_MANAGE_QUEUE_MEMBER_FAIL, payload: error.response.data.message });
      }
    };


    export const createManageQueueMember = (createManageQueueMember, setOpen, setResponse, setPassword, setExtension,) => async (dispatch) => {

      const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
        try {
          dispatch({ type: CREATE_MANAGE_QUEUE_MEMBER_REQUEST });
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token.access_token} `
            },
          };
          const { data } = await axios.post(
            
            
            `${api.dev}/api/userqmembers`,
            createManageQueueMember,
            config
          );
         if (data?.status === 200) {
            toast.success(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
            setOpen(false);
            setResponse(data);
            setPassword("") ;
            setExtension([])  ;     
          }  else {
            toast.error(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          }
          dispatch({ type: CREATE_MANAGE_QUEUE_MEMBER_SUCCESS, payload: data });
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: CREATE_MANAGE_QUEUE_MEMBER_FAIL,
            payload: error?.response?.data?.message,
          });
        }
      };

      export const deleteManageQueueMember = (userData, setResponse, setUniqueId) => async (dispatch) => {

        try {
          dispatch({ type: DELETE_MANAGE_QUEUE_MEMBER_REQUEST });
          const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    
          fetch(`${api.dev}/api/userqmembers`, {
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
            setUniqueId("");
            dispatch({ type: DELETE_MANAGE_QUEUE_MEMBER_SUCCESS, payload: data });
          })
          .catch(error => {
            // Handle fetch errors
            console.error('Fetch error:', error);
            toast.error('Error deleting. Please try again later.', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
          });
          
          
        } 
         catch (error) {
          dispatch({ type: DELETE_MANAGE_QUEUE_MEMBER_FAIL, payload: error.response.data.message });
        }
      };