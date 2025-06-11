import axios from "axios";
import { toast } from "react-toastify";
import { CREATE_ADMIN_MOH_FAIL, CREATE_ADMIN_MOH_REQUEST, CREATE_ADMIN_MOH_SUCCESS, GET_ADMIN_MOH_FAIL, GET_ADMIN_MOH_REQUEST, GET_ADMIN_MOH_SUCCESS, UPDATE_ADMIN_MOH_FAIL, UPDATE_ADMIN_MOH_REQUEST, UPDATE_ADMIN_MOH_SUCCESS } from "../../constants/adminPortal/adminPortal_mohConstants";
import { api } from "../../../mockData";

export const getAdminMoh = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: GET_ADMIN_MOH_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/moh`,
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: GET_ADMIN_MOH_SUCCESS,
              payload: response?.data?.data,
            });
          })
          .catch((error) => {
            toast.error(error?.response?.data?.msg, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
          });
      } catch (error) {
        toast.error(error?.response?.data?.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        dispatch({ type: GET_ADMIN_MOH_FAIL, payload: error.response.data.message });
      }
};

export const createAdminMoh = (createAdminMoh, setOpen, setResponse, setName, setUserId, setRecordings, setValues) => async (dispatch) => {
    
        const token = JSON.parse(localStorage.getItem("admin"));
          try {
            dispatch({ type: CREATE_ADMIN_MOH_REQUEST });
            const config = {
              headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.access_token} `
              },
            };
            const { data } = await axios.post(
              
              
              `${api.dev}/api/moh`,
              createAdminMoh,
              config
            );
           if (data?.status === 200) {
              toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
              });
              setOpen(false);
              setResponse(data);
              setName("");
              setUserId("");
              setRecordings([]);  
              setValues([])   
            }  else {
              toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
            }
            dispatch({ type: CREATE_ADMIN_MOH_SUCCESS, payload: data });
          } catch (error) {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
            dispatch({
              type: CREATE_ADMIN_MOH_FAIL,
              payload: error?.response?.data?.message,
            });
          }
};

export const updateAdminMoh = (updateAdminQueue, setOpenModal, setResponse,setName, setUserId, setRecordings, setValues) => async (dispatch) => {
            const token = JSON.parse(localStorage.getItem("admin"));
              try {
                dispatch({ type: UPDATE_ADMIN_MOH_REQUEST });
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token.access_token} `
                  },
                };
                const { data } = await axios.put(
                  
                  
                  `${api.dev}/api/moh`,
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
                  setName("");
                  setUserId("");
                  setRecordings([]);  
                  setValues([])          
                }  else {
                  toast.error(data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                  });
                }
                dispatch({ type: UPDATE_ADMIN_MOH_SUCCESS, payload: data });
              } catch (error) {
                toast.error(error?.response?.data?.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2500,
                });
                dispatch({
                  type: UPDATE_ADMIN_MOH_FAIL,
                  payload: error?.response?.data?.message,
                });
              }
};
  
