import axios from "axios";
import { CREATE_MANAGE_RECORDING_FAIL, CREATE_MANAGE_RECORDING_REQUEST, CREATE_MANAGE_RECORDING_SUCCESS, GET_MANAGE_RECORDING_FAIL, GET_MANAGE_RECORDING_REQUEST, GET_MANAGE_RECORDING_SUCCESS, UPDATE_MANAGE_RECORDING_FAIL, UPDATE_MANAGE_RECORDING_REQUEST, UPDATE_MANAGE_RECORDING_SUCCESS } from "../../constants/managePortal/managePortal_recordingConstants"
import { toast } from "react-toastify";
import { api } from "../../../mockData";

export const getManageRecording = () => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
      try {
        dispatch({ type: GET_MANAGE_RECORDING_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/userrecording`,
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: GET_MANAGE_RECORDING_SUCCESS,
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
        dispatch({ type: GET_MANAGE_RECORDING_FAIL, payload: error.response.data.message });
      }
};

export const createManageRecording = (createManageRecording, setOpen, setResponse, setUserId, setName) => async (dispatch) => {
    
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
      try {
        dispatch({ type: CREATE_MANAGE_RECORDING_REQUEST });
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        const { data } = await axios.post(
          
          
          `${api.dev}/api/userrecording`,
          createManageRecording,
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
        dispatch({ type: CREATE_MANAGE_RECORDING_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: CREATE_MANAGE_RECORDING_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };