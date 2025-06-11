import axios from "axios";
import { CREATE_ADMIN_RECORDING_FAIL, CREATE_ADMIN_RECORDING_REQUEST, CREATE_ADMIN_RECORDING_SUCCESS, GET_ADMIN_RECORDING_FAIL, GET_ADMIN_RECORDING_REQUEST, GET_ADMIN_RECORDING_SUCCESS, UPDATE_ADMIN_RECORDING_FAIL, UPDATE_ADMIN_RECORDING_REQUEST, UPDATE_ADMIN_RECORDING_SUCCESS } from "../../constants/adminPortal/adminPortal_recordingConstants"
import { toast } from "react-toastify";
import { api } from "../../../mockData";

export const getAdminRecording = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: GET_ADMIN_RECORDING_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/recording`,
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: GET_ADMIN_RECORDING_SUCCESS,
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
        dispatch({ type: GET_ADMIN_RECORDING_FAIL, payload: error.response.data.message });
      }
};

export const createAdminRecording = (createAdminRecording, setOpen, setResponse, setUserId, setName) => async (dispatch) => {
    
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: CREATE_ADMIN_RECORDING_REQUEST });
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        const { data } = await axios.post(
          
          
          `${api.dev}/api/recording`,
          createAdminRecording,
          config
        );
       if (data?.status === 200) {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setOpen(false);
          setResponse(data);
          setUserId("")  ;
          setName("");     
        }  else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
        dispatch({ type: CREATE_ADMIN_RECORDING_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: CREATE_ADMIN_RECORDING_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };