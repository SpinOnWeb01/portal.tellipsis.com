import axios from "axios";
import { CREATE_ADMIN_QUEUE_FAIL, CREATE_ADMIN_QUEUE_REQUEST, CREATE_ADMIN_QUEUE_SUCCESS, DELETE_ADMIN_QUEUE_MEMBER_FAIL, DELETE_ADMIN_QUEUE_MEMBER_REQUEST, DELETE_ADMIN_QUEUE_MEMBER_SUCCESS, GET_ADMIN_QUEUE_FAIL, GET_ADMIN_QUEUE_MEMBER_FAIL, GET_ADMIN_QUEUE_MEMBER_REQUEST, GET_ADMIN_QUEUE_MEMBER_SUCCESS, GET_ADMIN_QUEUE_REQUEST, GET_ADMIN_QUEUE_SUCCESS, UPDATE_ADMIN_QUEUE_FAIL, UPDATE_ADMIN_QUEUE_REQUEST, UPDATE_ADMIN_QUEUE_SUCCESS } from "../../constants/adminPortal/adminPortal_queueConstants";
import {api} from '../../../mockData'
import { toast } from "react-toastify";

export const getAdminQueue = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: GET_ADMIN_QUEUE_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/queues`,
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: GET_ADMIN_QUEUE_SUCCESS,
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
            dispatch({ type: GET_ADMIN_QUEUE_FAIL, payload: errorMessage });
          
          });
      } catch (error) {
        toast.error(error?.response?.data?.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        dispatch({ type: GET_ADMIN_QUEUE_FAIL, payload: error.response.data.message });
      }
    };

    export const createAdminQueue = (createAdminQueue, handleClose, setResponse,) => async (dispatch) => {
    
        const token = JSON.parse(localStorage.getItem("admin"));
          try {
            dispatch({ type: CREATE_ADMIN_QUEUE_REQUEST });
            const config = {
              headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.access_token} `
              },
            };
            const { data } = await axios.post(
              
              
              `${api.dev}/api/queues`,
              createAdminQueue,
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
            dispatch({ type: CREATE_ADMIN_QUEUE_SUCCESS, payload: data });
          } catch (error) {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
            dispatch({
              type: CREATE_ADMIN_QUEUE_FAIL,
              payload: error?.response?.data?.message,
            });
          }
        };
    
        export const updateAdminQueue = (updateAdminQueue, handleCloseModal, setResponse,) => async (dispatch) => {
          const token = JSON.parse(localStorage.getItem("admin"));
            try {
              dispatch({ type: UPDATE_ADMIN_QUEUE_REQUEST });
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization" : `Bearer ${token.access_token} `
                },
              };
              const { data } = await axios.put(
                
                
                `${api.dev}/api/queues`,
                updateAdminQueue,
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
              dispatch({ type: UPDATE_ADMIN_QUEUE_SUCCESS, payload: data });
            } catch (error) {
              toast.error(error?.response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
              dispatch({
                type: UPDATE_ADMIN_QUEUE_FAIL,
                payload: error?.response?.data?.message,
              });
            }
          };

          export const getAdminQueueMember = () => async (dispatch) => {
            const token = JSON.parse(localStorage.getItem("admin"));
              try {
                dispatch({ type: GET_ADMIN_QUEUE_MEMBER_REQUEST });
                let config = {
                  method: "get",
                  maxBodyLength: Infinity,
                  url: `${api.dev}/api/qmembers`,
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token.access_token} `
                  },
                };
                await axios
                  .request(config)
                  .then((response) => {
                    dispatch({
                      type: GET_ADMIN_QUEUE_MEMBER_SUCCESS,
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
                dispatch({ type: GET_ADMIN_QUEUE_MEMBER_FAIL, payload: error.response.data.message });
              }
            };


            export const createAdminQueueMember = (createAdminQueueMember, setOpen, setResponse, setPassword, setUserId,) => async (dispatch) => {
    
              const token = JSON.parse(localStorage.getItem("admin"));
                try {
                  dispatch({ type: CREATE_ADMIN_QUEUE_REQUEST });
                  const config = {
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization" : `Bearer ${token.access_token} `
                    },
                  };
                  const { data } = await axios.post(
                    
                    
                    `${api.dev}/api/qmembers`,
                    createAdminQueueMember,
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
                    setUserId("")  ;     
                  }  else {
                    toast.error(data?.message, {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 2500,
                    });
                  }
                  dispatch({ type: CREATE_ADMIN_QUEUE_SUCCESS, payload: data });
                } catch (error) {
                  toast.error(error?.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                  });
                  dispatch({
                    type: CREATE_ADMIN_QUEUE_FAIL,
                    payload: error?.response?.data?.message,
                  });
                }
              };

              export const deleteAdminQueueMember = (userData, setResponse, setUniqueId) => async (dispatch) => {
  
                try {
                  dispatch({ type: DELETE_ADMIN_QUEUE_MEMBER_REQUEST });
                  const token = JSON.parse(localStorage.getItem("admin"));
            
                  fetch(`${api.dev}/api/qmembers`, {
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
                    dispatch({ type: DELETE_ADMIN_QUEUE_MEMBER_SUCCESS, payload: data });
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
                  dispatch({ type: DELETE_ADMIN_QUEUE_MEMBER_FAIL, payload: error.response.data.message });
                }
              };
              