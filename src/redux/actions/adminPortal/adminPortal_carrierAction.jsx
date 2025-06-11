import { CREATE_ADMIN_CARRIER_FAIL, CREATE_ADMIN_CARRIER_REQUEST, CREATE_ADMIN_CARRIER_SUCCESS, DELETE_ADMIN_CARRIER_FAIL, DELETE_ADMIN_CARRIER_REQUEST, DELETE_ADMIN_CARRIER_SUCCESS, GET_ADMIN_CARRIER_FAIL, GET_ADMIN_CARRIER_REQUEST, GET_ADMIN_CARRIER_SUCCESS, UPDATE_ADMIN_CARRIER_FAIL, UPDATE_ADMIN_CARRIER_REQUEST, UPDATE_ADMIN_CARRIER_SUCCESS } from "../../constants/adminPortal/adminPortal_carrierConstants"

import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../mockData";

export const getAdminCarrier = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: GET_ADMIN_CARRIER_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/carrierresource`,
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: GET_ADMIN_CARRIER_SUCCESS,
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
        dispatch({ type: GET_ADMIN_CARRIER_FAIL, payload: error.response.data.message });
      }
    };

    export const createAdminCarrier = (createAdminCarrier, setOpen, setResponse,handleClose) => async (dispatch) => {
    
        const token = JSON.parse(localStorage.getItem("admin"));
          try {
            dispatch({ type: CREATE_ADMIN_CARRIER_REQUEST });
            const config = {
              headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.access_token} `
              },
            };
            const { data } = await axios.post(
              
              
              `${api.dev}/api/carrierresource`,
              createAdminCarrier,
              config
            );
           if (data?.status === 200) {
              toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
              });
              setOpen(false);
              setResponse(data);
              handleClose();
            }  else {
              toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
            }
            dispatch({ type: CREATE_ADMIN_CARRIER_SUCCESS, payload: data });
          } catch (error) {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
            dispatch({
              type: CREATE_ADMIN_CARRIER_FAIL,
              payload: error?.response?.data?.message,
            });
          }
        };

        export const updateAdminCarrier = (updateCarrier, setOpenModal, setResponse, handleCloseModal) => async (dispatch) => {
          const token = JSON.parse(localStorage.getItem("admin"));
            try {
              dispatch({ type: UPDATE_ADMIN_CARRIER_REQUEST });
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization" : `Bearer ${token.access_token} `
                },
              };
              const { data } = await axios.put(
                
                
                `${api.dev}/api/carrierresource`,
                updateCarrier,
                config
              );
             if (data?.status === 200) {
                toast.success(data?.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1500,
                });
                setOpenModal(false);
                setResponse(data);
                handleCloseModal();       
              }  else {
                toast.error(data?.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2500,
                });
              }
              dispatch({ type: UPDATE_ADMIN_CARRIER_SUCCESS, payload: data });
            } catch (error) {
              toast.error(error?.response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
              dispatch({
                type: UPDATE_ADMIN_CARRIER_FAIL,
                payload: error?.response?.data?.message,
              });
            }
          };

        export const deleteAdminCarrier = (userData, setResponse, setCarrierId, setName) => async (dispatch) => {
                
  
          try {
            dispatch({ type: DELETE_ADMIN_CARRIER_REQUEST });
            const token = JSON.parse(localStorage.getItem("admin"));
      
            fetch(`${api.dev}/api/carrierresource`, {
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
              setCarrierId("")
              setName("")
              dispatch({ type: DELETE_ADMIN_CARRIER_SUCCESS, payload: data });
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
            dispatch({ type: DELETE_ADMIN_CARRIER_FAIL, payload: error.response.data.message });
          }
        };