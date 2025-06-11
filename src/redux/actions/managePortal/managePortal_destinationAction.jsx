import axios from "axios";
import { api } from "../../../mockData";
import {
  GET_MANAGE_DID_FAIL,
  GET_MANAGE_DID_REQUEST,
  GET_MANAGE_DID_SUCCESS,
  UPDATE_MANAGE_DESTINATION_FAIL,
  UPDATE_MANAGE_DESTINATION_REQUEST,
  UPDATE_MANAGE_DESTINATION_SUCCESS,
} from "../../constants/managePortal/managePortal_destinationConstants";
import { toast } from "react-toastify";

export const getManageDid = () => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
  try {
    dispatch({ type: GET_MANAGE_DID_REQUEST });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/userdidresource`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    await axios
      .request(config)
      .then((response) => {
        dispatch({
          type: GET_MANAGE_DID_SUCCESS,
          payload: response?.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch({
      type: GET_MANAGE_DID_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateManageDestination =
  (updateDid, setEdit, setResponse) => async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    try {
      dispatch({ type: UPDATE_MANAGE_DESTINATION_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.put(
        `${api.dev}/api/userdidresource`,
        updateDid,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setEdit(false);
        setResponse(data);
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: UPDATE_MANAGE_DESTINATION_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: UPDATE_MANAGE_DESTINATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
