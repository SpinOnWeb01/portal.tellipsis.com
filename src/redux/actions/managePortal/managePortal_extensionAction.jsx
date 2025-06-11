import axios from "axios";
import {
  CREATE_MANAGE_EXTENSION_FAIL,
  CREATE_MANAGE_EXTENSION_REQUEST,
  CREATE_MANAGE_EXTENSION_SUCCESS,
  DELETE_MANAGE_EXTENSION_FAIL,
  DELETE_MANAGE_EXTENSION_REQUEST,
  DELETE_MANAGE_EXTENSION_SUCCESS,
  GET_MANAGE_EXTENSION_FAIL,
  GET_MANAGE_EXTENSION_REQUEST,
  GET_MANAGE_EXTENSION_SUCCESS,
  GET_MANAGE_PROFILE_EXTENSION_FAIL,
  GET_MANAGE_PROFILE_EXTENSION_REQUEST,
  GET_MANAGE_PROFILE_EXTENSION_SUCCESS,
  UPDATE_MANAGE_EXTENSION_FAIL,
  UPDATE_MANAGE_EXTENSION_REQUEST,
  UPDATE_MANAGE_EXTENSION_SUCCESS,
} from "../../constants/managePortal/managePortal_extensionConstants";
import { api } from "../../../mockData";
import { toast } from "react-toastify";

export const getManageExtension = () => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
  try {
    dispatch({ type: GET_MANAGE_EXTENSION_REQUEST });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/userextension`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    await axios
      .request(config)
      .then((response) => {
        dispatch({
          type: GET_MANAGE_EXTENSION_SUCCESS,
          payload: response?.data?.data,
        });
      })
      .catch((error) => {
        dispatch({ type: GET_MANAGE_EXTENSION_FAIL, payload: error.response });
      });
  } catch (error) {
    dispatch({
      type: GET_MANAGE_EXTENSION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getManageProfileExtension = () => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
  try {
    dispatch({ type: GET_MANAGE_PROFILE_EXTENSION_REQUEST });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/getuserprofileextensions`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    await axios
      .request(config)
      .then((response) => {
        dispatch({
          type: GET_MANAGE_PROFILE_EXTENSION_SUCCESS,
          payload: response?.data?.data,
        });
      })
      .catch((error) => {
        dispatch({ type: GET_MANAGE_PROFILE_EXTENSION_FAIL, payload: error.response });
      });
  } catch (error) {
    dispatch({
      type: GET_MANAGE_PROFILE_EXTENSION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createManageExtension =
  (
    createExtensn,
    setOpen,
    setResponse,
    setExtensionNumber,
    setPassword,
    setUserId
  ) =>
  async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    try {
      dispatch({ type: CREATE_MANAGE_EXTENSION_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/userextension`,
        createExtensn,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpen(false);
        setExtensionNumber("");
        setResponse(data);
        setPassword("");
        setUserId("");
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: CREATE_MANAGE_EXTENSION_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: CREATE_MANAGE_EXTENSION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const updateManageExtension =
  (updateExtensn, setOpenModal, setResponse, setPassword, setUserId) =>
  async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    try {
      dispatch({ type: UPDATE_MANAGE_EXTENSION_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.put(
        `${api.dev}/api/userextension`,
        updateExtensn,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpenModal(false);
        setResponse(data);
        setPassword("");
        setUserId("");
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: UPDATE_MANAGE_EXTENSION_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: UPDATE_MANAGE_EXTENSION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const deleteManageExtension =
  (userData, setResponse, setExtensionId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_MANAGE_EXTENSION_REQUEST });

      const current_user = localStorage.getItem("current_user");
      const token = JSON.parse(localStorage.getItem(`user_${current_user}`));

      fetch(`${api.dev}/api/userextension`, {
        method: "DELETE",
        body: JSON.stringify(userData), // Using body instead of data for sending data
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            // Parse JSON response
            return response.json();
          } else {
            // Handle error status
            throw new Error(`Request failed with status ${response.status}`);
          }
        })
        .then((data) => {
          // Handle successful response
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setResponse(data);
          setExtensionId("");
          dispatch({ type: DELETE_MANAGE_EXTENSION_SUCCESS, payload: data });
        })
        .catch((error) => {
          // Handle fetch errors
          toast.error("Error deleting. Please try again later.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        });
    } catch (error) {
      dispatch({
        type: DELETE_MANAGE_EXTENSION_FAIL,
        payload: error.response.data.message,
      });
    }
  };
