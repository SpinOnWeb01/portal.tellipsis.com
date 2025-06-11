import { api } from "../../../mockData";
import axios from "axios";
import { toast } from "react-toastify";
import { CREATE_MANAGE_MOH_FAIL, CREATE_MANAGE_MOH_REQUEST, CREATE_MANAGE_MOH_SUCCESS, GET_MANAGE_MOH_FAIL, GET_MANAGE_MOH_REQUEST, GET_MANAGE_MOH_SUCCESS, UPDATE_MANAGE_MOH_FAIL, UPDATE_MANAGE_MOH_REQUEST, UPDATE_MANAGE_MOH_SUCCESS } from "../../constants/managePortal/managePortal_mohConstants"


export const getManageMoh = () => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
      try {
        dispatch({ type: GET_MANAGE_MOH_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/usermoh`,
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: GET_MANAGE_MOH_SUCCESS,
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
        dispatch({ type: GET_MANAGE_MOH_FAIL, payload: error.response.data.message });
      }
};

export const createManageMoh = (createManageMoh, setOpen, setResponse, setName, setUserId, setRecordings, setValues) => async (dispatch) => {
    
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
          try {
            dispatch({ type: CREATE_MANAGE_MOH_REQUEST });
            const config = {
              headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.access_token} `
              },
            };
            const { data } = await axios.post(
              
              
              `${api.dev}/api/usermoh`,
              createManageMoh,
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
            dispatch({ type: CREATE_MANAGE_MOH_SUCCESS, payload: data });
          } catch (error) {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
            dispatch({
              type: CREATE_MANAGE_MOH_FAIL,
              payload: error?.response?.data?.message,
            });
          }
};

export const updateManageMoh = (updateManageQueue, setOpenModal, setResponse,setName, setUserId, setRecordings, setValues) => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
              try {
                dispatch({ type: UPDATE_MANAGE_MOH_REQUEST });
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token.access_token} `
                  },
                };
                const { data } = await axios.put(
                  
                  
                  `${api.dev}/api/usermoh`,
                  updateManageQueue,
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
                dispatch({ type: UPDATE_MANAGE_MOH_SUCCESS, payload: data });
              } catch (error) {
                toast.error(error?.response?.data?.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2500,
                });
                dispatch({
                  type: UPDATE_MANAGE_MOH_FAIL,
                  payload: error?.response?.data?.message,
                });
              }
};