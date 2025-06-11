import axios from "axios";
import { CREATE_MANAGE_CALL_BLOCK_FAIL, CREATE_MANAGE_CALL_BLOCK_REQUEST, CREATE_MANAGE_CALL_BLOCK_SUCCESS, DELETE_MANAGE_CALL_BLOCK_FAIL, DELETE_MANAGE_CALL_BLOCK_REQUEST, DELETE_MANAGE_CALL_BLOCK_SUCCESS, GET_MANAGE_CALL_BLOCK_FAIL, GET_MANAGE_CALL_BLOCK_REQUEST, GET_MANAGE_CALL_BLOCK_SUCCESS, UPDATE_MANAGE_CALL_BLOCK_FAIL, UPDATE_MANAGE_CALL_BLOCK_REQUEST, UPDATE_MANAGE_CALL_BLOCK_SUCCESS } from "../../constants/managePortal/managePortal_callBlockConstants";
import { api } from "../../../mockData";
import { toast } from "react-toastify";

export const getManageCallBlock = () => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    try {
      dispatch({ type: GET_MANAGE_CALL_BLOCK_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/usercalleridblock`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_MANAGE_CALL_BLOCK_SUCCESS,
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
        type: GET_MANAGE_CALL_BLOCK_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const createManageCallBlock =
  (
    callBlock,
    setOpen,
    setResponse,
    setDescription,
        setDetails,
        setType,
        setIsActive
  ) =>
  async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    try {
      dispatch({ type: CREATE_MANAGE_CALL_BLOCK_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/usercalleridblock`,
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
      dispatch({ type: CREATE_MANAGE_CALL_BLOCK_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: CREATE_MANAGE_CALL_BLOCK_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  export const updateManageCallBlock =
  (updateCallBlock, setOpenModal, setResponse, setDescription,
  setDetails,
  setType,
  setIsActive) =>
  async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    try {
      dispatch({ type: UPDATE_MANAGE_CALL_BLOCK_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.put(
        `${api.dev}/api/usercalleridblock`,
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
      dispatch({ type: UPDATE_MANAGE_CALL_BLOCK_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: UPDATE_MANAGE_CALL_BLOCK_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  export const deleteManageCallBlock = (userData, setResponse, setCallBlockId) => async (dispatch) => {
  
    try {
      dispatch({ type: DELETE_MANAGE_CALL_BLOCK_REQUEST });
      const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));

      fetch(`${api.dev}/api/usercalleridblock`, {
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
        setCallBlockId("");
        dispatch({ type: DELETE_MANAGE_CALL_BLOCK_SUCCESS, payload: data });
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
      dispatch({ type: DELETE_MANAGE_CALL_BLOCK_FAIL, payload: error.response.data.message });
    }
  };
  
