import { api } from "../../../mockData";
import axios from "axios";
import {
  CREATE_ADMIN_CALL_BLOCK_FAIL,
  CREATE_ADMIN_CALL_BLOCK_REQUEST,
  CREATE_ADMIN_CALL_BLOCK_SUCCESS,
  DELETE_ADMIN_CALL_BLOCK_FAIL,
  DELETE_ADMIN_CALL_BLOCK_REQUEST,
  DELETE_ADMIN_CALL_BLOCK_SUCCESS,
  GET_ADMIN_CALL_BLOCK_FAIL,
  GET_ADMIN_CALL_BLOCK_REQUEST,
  GET_ADMIN_CALL_BLOCK_SUCCESS,
  UPDATE_ADMIN_CALL_BLOCK_FAIL,
  UPDATE_ADMIN_CALL_BLOCK_REQUEST,
  UPDATE_ADMIN_CALL_BLOCK_STATUS_FAIL,
  UPDATE_ADMIN_CALL_BLOCK_STATUS_REQUEST,
  UPDATE_ADMIN_CALL_BLOCK_STATUS_SUCCESS,
  UPDATE_ADMIN_CALL_BLOCK_SUCCESS,
} from "../../constants/adminPortal/adminPortal_callBlockConstants";
import { toast } from "react-toastify";

export const getAdminCallBlock = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem(`admin`));
      try {
        dispatch({ type: GET_ADMIN_CALL_BLOCK_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/callblocker`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token} `,
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: GET_ADMIN_CALL_BLOCK_SUCCESS,
              payload: response?.data,
            });
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          });
      } catch (error) {
        dispatch({
          type: GET_ADMIN_CALL_BLOCK_FAIL,
          payload: error.response.data.message,
        });
      }
    };

export const createAdminCallBlock =
  (
    callBlock,
    setOpen,
    setResponse,
    setDescription,
    setDetails,
    setType,
    setIsActive,
    setUserId
  ) =>
  async (dispatch) => {
    const token = JSON.parse(localStorage.getItem(`admin`));
    try {
      dispatch({ type: CREATE_ADMIN_CALL_BLOCK_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/callblocker`,
        callBlock,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpen(false);
        setResponse(data);
        setDescription("");
        setDetails("");
        setType("");
        setIsActive("");
        setUserId("");
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: CREATE_ADMIN_CALL_BLOCK_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: CREATE_ADMIN_CALL_BLOCK_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  export const updateAdminCallBlock =
  (updateCallBlock, setOpenModal, setResponse, setDescription,
  setDetails,
  setType,
  setIsActive) =>
  async (dispatch) => {
  const token = JSON.parse(localStorage.getItem(`admin`));
    try {
      dispatch({ type: UPDATE_ADMIN_CALL_BLOCK_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.put(
        `${api.dev}/api/callblocker`,
        updateCallBlock,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpenModal(false);
        setResponse(data);
        setDescription("")
        setDetails("")
        setType("")
        setIsActive("")
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: UPDATE_ADMIN_CALL_BLOCK_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: UPDATE_ADMIN_CALL_BLOCK_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  export const deleteAdminCallBlock = (userData, setResponse, setCallBlockId) => async (dispatch) => {
  
    try {
      dispatch({ type: DELETE_ADMIN_CALL_BLOCK_REQUEST });
  const token = JSON.parse(localStorage.getItem(`admin`));

      fetch(`${api.dev}/api/callblocker`, {
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
        setCallBlockId("")
        dispatch({ type: DELETE_ADMIN_CALL_BLOCK_SUCCESS, payload: data });
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
      dispatch({ type: DELETE_ADMIN_CALL_BLOCK_FAIL, payload: error.response.data.message });
    }
  };

  export const updateCallBlockStaus = ( status, setResponse, setSelectedRows) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("admin"));
  try {
    dispatch({ type: UPDATE_ADMIN_CALL_BLOCK_STATUS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token.access_token} `
      },
    };
    const { data } = await axios.put(
      
      
      `${api.dev}/api/multiplecallblock`,
      JSON.stringify(status),
      config
    );
   if (data?.status === 200) {
      toast.success(data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });      
      setResponse(data);  
      setSelectedRows([]);
    }  else {
      toast.error(data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
    }

    dispatch({ type: UPDATE_ADMIN_CALL_BLOCK_STATUS_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2500,
    });
    dispatch({ type: UPDATE_ADMIN_CALL_BLOCK_STATUS_FAIL, payload: error.response.data.message });
  }
};
