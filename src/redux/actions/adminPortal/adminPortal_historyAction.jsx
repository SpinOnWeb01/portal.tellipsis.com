import axios from "axios";
import { GET_ADMIN_ADD_MINUTE_FAIL, GET_ADMIN_ADD_MINUTE_REQUEST, GET_ADMIN_ADD_MINUTE_SUCCESS, GET_ADMIN_HISTORY_FAIL, GET_ADMIN_HISTORY_REQUEST, GET_ADMIN_HISTORY_SUCCESS, POST_ADMIN_ADD_MINUTE_FAIL, POST_ADMIN_ADD_MINUTE_REQUEST, POST_ADMIN_ADD_MINUTE_SUCCESS } from "../../constants/adminPortal/adminPortal_historyConstants";
import { api } from "../../../mockData";
import { toast } from "react-toastify";

export const getHistory = (filterdata) => async (dispatch) => {
  // Retrieve the token
  const token = JSON.parse(localStorage.getItem("admin"));

  if (!token || !token.access_token) {
    dispatch({
      type: GET_ADMIN_HISTORY_FAIL,
      payload: "Authorization token is missing.",
    });
    return;
  }

  try {
    // Dispatch request start action
    dispatch({ type: GET_ADMIN_HISTORY_REQUEST });

    // Set up the config object for axios request
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/billinghistory`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.access_token}`,
      },
      data: filterdata, // Use 'data' instead of 'body' to send payload
    };

    // Send the request using axios
    const response = await axios.request(config);

    // Dispatch success action with the response data
    dispatch({
      type: GET_ADMIN_HISTORY_SUCCESS,
      payload: response.data.data, // Ensure this path matches your API response structure
    });
  } catch (error) {
    toast.error(error.response.data.message)
    // Initialize error message
    let errorMessage = "An error occurred while fetching data.";

    // Check if error response exists
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        errorMessage = "Permission Denied";
      } else if (status === 401) {
        errorMessage = error.response.data.message || "Token has expired";
      } else if (status === 400 || status === 500) {
        errorMessage = error.response.data.message || "Bad Request";
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = "No response received from the server.";
    } else {
      // Something happened in setting up the request
      errorMessage = error.message || "Request setup error.";
    }

    // Dispatch fail action with the error message
    dispatch({
      type: GET_ADMIN_HISTORY_FAIL,
      payload: errorMessage,
    });
  }
};

export const getAddMinuteHistory = () => async (dispatch) => {
  // Retrieve the token
  const token = JSON.parse(localStorage.getItem("admin"));

  if (!token || !token.access_token) {
    dispatch({
      type: GET_ADMIN_ADD_MINUTE_FAIL,
      payload: "Authorization token is missing.",
    });
    return;
  }

  try {
    // Dispatch request start action
    dispatch({ type: GET_ADMIN_ADD_MINUTE_REQUEST });

    // Set up the config object for axios request
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/totaladdminutes`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.access_token}`,
      }, // Use 'data' instead of 'body' to send payload
    };

    // Send the request using axios
    const response = await axios.request(config);

    // Dispatch success action with the response data
    dispatch({
      type: GET_ADMIN_ADD_MINUTE_SUCCESS,
      payload: response.data.data, // Ensure this path matches your API response structure
    });
  } catch (error) {
    // Initialize error message
    toast.error(error.response.data.message)
    let errorMessage = "An error occurred while fetching data.";

    // Check if error response exists
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        errorMessage = "Permission Denied";
      } else if (status === 401) {
        errorMessage = error.response.data.message || "Token has expired";
      } else if (status === 400 || status === 500) {
        errorMessage = error.response.data.message || "Bad Request";
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = "No response received from the server.";
    } else {
      // Something happened in setting up the request
      errorMessage = error.message || "Request setup error.";
    }

    // Dispatch fail action with the error message
    dispatch({
      type: GET_ADMIN_ADD_MINUTE_FAIL,
      payload: errorMessage,
    });
  }
};

export const postAddMinuteHistory = (filterdata) => async (dispatch) => {
  // Retrieve the token
  const token = JSON.parse(localStorage.getItem("admin"));

  if (!token || !token.access_token) {
    dispatch({
      type: POST_ADMIN_ADD_MINUTE_REQUEST,
      payload: "Authorization token is missing.",
    });
    return;
  }

  try {
    // Dispatch request start action
    dispatch({ type: POST_ADMIN_ADD_MINUTE_REQUEST });

    // Set up the config object for axios request
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/totalminutes`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.access_token}`,
      },
      data: filterdata, // Use 'data' instead of 'body' to send payload
    };

    // Send the request using axios
    const response = await axios.request(config);

    // Dispatch success action with the response data
    dispatch({
      type: POST_ADMIN_ADD_MINUTE_SUCCESS,
      payload: response.data.data, // Ensure this path matches your API response structure
    });
  } catch (error) {
    // Initialize error message
    let errorMessage = "An error occurred while fetching data.";
    toast.error(error.response.data.message)
    // Check if error response exists
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        errorMessage = "Permission Denied";
      } else if (status === 401) {
        errorMessage = error.response.data.message || "Token has expired";
      } else if (status === 400 || status === 500) {
        errorMessage = error.response.data.message || "Bad Request";
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = "No response received from the server.";
    } else {
      // Something happened in setting up the request
      errorMessage = error.message || "Request setup error.";
    }

    // Dispatch fail action with the error message
    dispatch({
      type: POST_ADMIN_ADD_MINUTE_FAIL,
      payload: errorMessage,
    });
  }
};
