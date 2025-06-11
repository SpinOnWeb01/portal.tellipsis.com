import { toast } from "react-toastify";
import { api } from "../../../mockData";
import axios from "axios";
import { GET_ADMIN_ASSISTANT_FAIL, GET_ADMIN_ASSISTANT_REQUEST, GET_ADMIN_ASSISTANT_SUCCESS } from "../../constants/adminPortal/adminPortal_assistantConstants";

export const getAdminAssitant = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_ASSISTANT_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/didsuspend`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_ASSISTANT_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_ADMIN_ASSISTANT_FAIL,
        payload: error.response.data.message,
      });
    }
  };